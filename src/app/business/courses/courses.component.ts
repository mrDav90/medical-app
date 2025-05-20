import { Component, inject, OnInit } from '@angular/core';
import { AddCourseComponent } from './components/add-course/add-course.component';
import {
  NzModalComponent,
  NzModalModule,
  NzModalService,
} from 'ng-zorro-antd/modal';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CourseResponse } from './models/course-response';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CourseService } from './services/course.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    AddCourseComponent,
    NzModalModule,
    NzButtonModule,
    NzFlexModule,
    NzDividerModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  isVisible = false;
  tableLoading = false;
  currentRecord: CourseResponse | null = null;
  modalService = inject(NzModalService);
  courseService = inject(CourseService);
  private readonly message = inject(NzMessageService);
  listCourses: CourseResponse[] = [];

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.tableLoading = true;
    this.courseService.all<CourseResponse[]>('api/v1/courses').subscribe({
      next: (data) => {
        this.listCourses = data;
      },
      error: (error) => {
        console.log(error);
        this.tableLoading = false;
      },
      complete: () => {
        console.log('traitement termine.');
        this.tableLoading = false;
      },
    });
  }

  addCourse(): void {
    this.isVisible = true;
    this.currentRecord = null;
  }

  updateCourse(course: CourseResponse) {
    this.isVisible = true;
    this.currentRecord = course;
  }

  deleteCourse(id: string) {
    this.modalService.confirm({
      nzTitle: 'Suppression',
      nzContent: 'Etes-vous sûr de vouloir supprimer ce cours ?',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.courseService.delete(`api/v1/courses`, id).subscribe({
          next: () => {
            this.message.success(`Cours ${id} supprimé avec succès`);
            this.loadCourses();
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            console.log('traitement termine.');
          },
        });
      },
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
