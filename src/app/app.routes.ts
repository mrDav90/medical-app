import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './business/dashboard/dashboard.component';
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
