import { Component, inject, OnInit } from '@angular/core';
import {
  NzModalModule,
  NzModalService,
} from 'ng-zorro-antd/modal';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { ClasseResponse } from './models/classe-response';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ClasseService } from './services/classe.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddClasseComponent } from "./components/add-classe/add-classe.component";


@Component({
  selector: 'app-classes',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzFlexModule,
    NzDividerModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    AddClasseComponent
],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent implements OnInit {

  isVisible = false;
    tableLoading = false;
    currentRecord: ClasseResponse | null = null;
    modalService = inject(NzModalService);
    classeService = inject(ClasseService);
    private readonly message = inject(NzMessageService);
    listClasses: ClasseResponse[] = [];

    ngOnInit(): void {
        this.loadClasses();
      }
    
      loadClasses() {
        this.tableLoading = true;
        this.classeService.all<ClasseResponse[]>('api/v1/classes').subscribe({
          next: (data) => {
            this.listClasses = data;
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
    
      addClasse(): void {
        this.isVisible = true;
        this.currentRecord = null;
      }
    
      updateClasse(classe: ClasseResponse) {
        this.isVisible = true;
        this.currentRecord = classe;
      }
    
      deleteClasse(id: string) {
        this.modalService.confirm({
          nzTitle: 'Suppression',
          nzContent: 'Etes-vous sûr de vouloir supprimer cette classe ?',
          nzOkText: 'Oui',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => {
            this.classeService.delete(`api/v1/classes`, id).subscribe({
              next: () => {
                this.message.success(`Classe ${id} supprimée avec succès`);
                this.loadClasses();
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
