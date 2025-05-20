import { Component, inject} from '@angular/core';
import { ReactiveFormsModule,NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender, StudentResponse } from '../../models/student-response';
import { StudentRequest } from '../../models/student-request';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { nationalities } from '../../../../shared/utils/nationalities';
@Component({
  selector: 'app-add-student',
  imports: [
      NzPageHeaderModule,
      NzFormModule,
      ReactiveFormsModule,
      NzInputModule,
      NzSpaceModule,
      NzButtonModule,
      NzFlexModule,
      NzRadioModule,
      NzCardModule,
      NzSelectModule,
      NzDatePickerModule,

    ],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private studentService = inject(StudentService);
    private messageService = inject(NzMessageService);
    nationalitiesList = nationalities;

    private fb = inject(NonNullableFormBuilder);
    studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: [ Gender.MALE, [Validators.required]],
      birthDate: ['', [Validators.required]],
      placeOfBirth : ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      emailPerso: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [''],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: [''],
      }),
      phoneNumber: ['', [Validators.required]],
      profilePicture: [''],
      personToNotifyName : [''],
      personToNotifyPhoneNumber: [''],
      document : this.fb.group({
        cin: [''],
        birthCertificate: [''],})
    });

    id :string | null = null;
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
     
      if (this.id) {
        this.studentService
          .get<StudentResponse>(`api/v1/students`, this.id)
          .subscribe({
            next: (data) => {
              this.studentForm.patchValue(data);
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              console.log('traitement termine.');
            },
          });
      }
    }
    submitForm() {
      if (this.studentForm.valid) {
        if (this.id) {
          this.studentService
            .update<StudentRequest, StudentResponse>(
              'api/v1/students',
              this.studentForm.value as StudentRequest,
              this.id
            )
            .subscribe({
              next: (data) => {
                this.messageService.success(
                  `Etudiant ${data.registrationNu} modifiée avec succès`
                );
              },
              error: (error) => {
                console.log(error);
              },
              complete: () => {
                console.log('traitement termine.');
              },
            });
        } else {
          this.studentService
            .save<StudentRequest, StudentResponse>(
              'api/v1/students',
              this.studentForm.value as StudentRequest
            )
            .subscribe({
              next: (data) => {
                this.messageService.success(
                  `Etudiant ${data.registrationNu} crée avec succès`
                );
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
        Object.values(this.studentForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }

    onCancel() {
      this.router.navigate(['/students']);
    }
}
