import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { CaslService } from '../../../shared/services/casl/casl.service';

export interface MenuItem {
  key? : string;
  title: string;
  icon?: string;
  route: string;
  children? : MenuItem[];
  group? : MenuItem[];
  display?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [NzIconModule, NzLayoutModule, NzMenuModule , MenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isCollapsed : boolean = false;
  caslService = inject(CaslService);
  can = this.caslService.can.bind(this.caslService);

  menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      title: 'Tableau de bord',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      key: 'students',
      title: 'Etudiants',
      icon: 'user',
      route: '/students',
    },
    {
      key: 'courses',
      title: 'Cours',
      icon: 'book',
      route: '/courses',
    },
    {
      key: 'classes',
      title: 'Classes',
      icon: 'appstore',
      route: '/classes',
    },
    {
      
      title: 'Paramètres',
      icon: 'settings',
      route: '/settings',
      // children: [
      //   {
      //     title: 'Mon compte',
      //     route: '/settings/account'
      //   }
      // ],
      group: [
        {
          key: 'account',
          title: 'Mon compte',
          route: '/settings/account',
          icon: 'user',
        }
      ]
    },
    {
      key: 'account',
      title: 'Comptes utilisateurs',
      icon: 'team',
      route: '/users'
    },
    {
      key: 'roles',
      title: 'Rôles',
      icon: 'safety',
      route: '/roles'
    },
  ];
  selectedMenuItem: MenuItem | null = null;
}
