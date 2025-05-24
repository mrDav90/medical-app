import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { StudentsComponent } from './business/students/students.component';
import { CoursesComponent } from './business/courses/courses.component';
import { DashboardComponent } from './business/dashboard/dashboard.component';
import { ClassesComponent } from './business/classes/classes.component';
import { canActivateAuthRole } from './auth/guard/auth.guard';
import { RolesComponent } from './business/roles/roles.component';
import { UsersComponent } from './business/users/users.component';
import { PatientsComponent } from './business/patients/patients.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      breadcrumb: 'Accueil',
    },
    canActivate: [canActivateAuthRole],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          breadcrumb: 'Tableau de bord',
        },
      },
      {
        path: 'students',
        data: {
          breadcrumb: 'Etudiants',
        },
        // component : StudentsComponent ,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./business/students/students.component').then(
                (m) => m.StudentsComponent
              ),
            data: {
              breadcrumb: 'Liste',
            },
          },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './business/students/components/add-student/add-student.component'
              ).then((m) => m.AddStudentComponent),
              data: {
                breadcrumb: 'Nouveau',
              },
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import(
                './business/students/components/add-student/add-student.component'
              ).then((m) => m.AddStudentComponent),
              data: {
                breadcrumb: 'Modification Etudiant',
              },
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './business/students/components/student-details/student-details.component'
              ).then((m) => m.StudentDetailsComponent),
          },
        ],
      },
      {
        path: 'courses',
        component: CoursesComponent,
        data: {
          breadcrumb: 'Cours',
        },
      },
      {
        path: 'classes',
        component: ClassesComponent,
        data: {
          breadcrumb: 'Classes',
        },
      },
      {
        path: 'patients',
        component: PatientsComponent,
        data: {
          breadcrumb: 'Liste des patients',
        },
      },
      {
        path: 'users',
        component: UsersComponent ,
        data: {
          breadcrumb: 'Comptes Utilisateurs',
        },
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          breadcrumb: 'Rôles',
        },
      },
    ],
  },
];
