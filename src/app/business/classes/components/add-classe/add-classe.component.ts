import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClasseResponse } from '../../models/classe-response';
import { ClasseService } from '../../services/classe.service';
import { ClasseRequest } from '../../models/classe-request';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-add-classe',
  standalone: true,
  imports: [
    NzPageHeaderModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSpaceModule,
    NzButtonModule,
    NzFlexModule,
  ],
  templateUrl: './add-classe.component.html',
  styleUrl: './add-classe.component.css',
})
export class AddClasseComponent {
  @Input() currentRecord: ClasseResponse | null = null;
  @Output() close = new EventEmitter();
  @Output() refresh = new EventEmitter();
  classeService = inject(ClasseService);
  private messageService = inject(NzMessageService);
  classeForm: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
  }>;
  constructor(private fb: NonNullableFormBuilder) {
    this.classeForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnInit(): void {
    if (this.currentRecord) {
      this.classeForm.patchValue(this.currentRecord);
    }
  }
  submitForm() {
    if (this.classeForm.valid) {
      if (this.currentRecord) {
        this.classeService
          .update<ClasseRequest, ClasseResponse>(
            'api/v1/classes',
            this.classeForm.value as ClasseRequest,
            this.currentRecord.id
          )
          .subscribe({
            next: (data) => {
              this.messageService.success(
                `Classe ${data.name} modifiée avec succès`
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
        this.classeService
          .save<ClasseRequest, ClasseResponse>(
            'api/v1/classes',
            this.classeForm.value as ClasseRequest
          )
          .subscribe({
            next: (data) => {
              this.messageService.success(
                `Classe ${data.name} ajoutée avec succès`
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
      Object.values(this.classeForm.controls).forEach((control) => {
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
