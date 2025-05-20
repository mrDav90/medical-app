import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { CourseResponse } from '../../models/course-response';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CourseService } from '../../services/course.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CourseRequest } from '../../models/course-request';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    NzPageHeaderModule,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonComponent,
    NzInputModule,
    NzSpaceModule,
    NzFlexModule,
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent implements OnInit {
  @Input() currentRecord: CourseResponse | null = null;
  @Output() close = new EventEmitter();
  @Output() refresh = new EventEmitter();
  courseService = inject(CourseService);
  private messageService = inject(NzMessageService);
  courseForm: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
  }>;
  constructor(private fb: NonNullableFormBuilder) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnInit(): void {
    if (this.currentRecord) {
      this.courseForm.patchValue(this.currentRecord);
    }
  }
  submitForm() {
    if (this.courseForm.valid) {
      if (this.currentRecord) {
        this.courseService
          .update<CourseRequest, CourseResponse>(
            'api/v1/courses',
            this.courseForm.value as CourseRequest,
            this.currentRecord.id
          )
          .subscribe({
            next: (data) => {
              this.messageService.success(
                `Cours ${data.name} modifiée avec succès`
              );
              this.onClose();
              this.onRefresh();
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              console.log('traitement termine.');
            },
          });
      } else {
        this.courseService
          .save<CourseRequest, CourseResponse>(
            'api/v1/courses',
            this.courseForm.value as CourseRequest
          )
          .subscribe({
            next: (data) => {
              this.messageService.success(
                `Cours ${data.name} ajouté avec succès`
              );
              this.onClose();
              this.onRefresh();
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              console.log('traitement termine.');
            },
          });
      }
    } else {
      Object.values(this.courseForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onRefresh() {
    this.refresh.emit();
  }

  onClose() {
    this.close.emit();
  }
}
