import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faBookmark,
  faGrip,
  faHomeLgAlt,
  faUserPlus,
  faUserGroup,
  faCircleInfo,
  faGear,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { NotificationsService } from '../../shared/services/notifications.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Icons
  faHome = faHomeLgAlt;
  faBook = faBookmark;
  faCreateUser = faUserPlus;
  faGrid = faGrip;
  faUsers = faUserGroup;
  faInfo = faCircleInfo;
  faSettings = faGear;
  faDoor = faRightFromBracket;

  urlCurrent: any = '';
  isClose: boolean = true;
  isLogOut: boolean = true;
  date: any;
  intervalHour: any;
  user: any = null;

  constructor(
    public router: Router,
    public notificationsService: NotificationsService,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    this.user = await JSON.parse(this.authService.getUser());
    console.log(this.items);
    
  }

  ngOnDestroy(): void {
    // clearInterval(this.intervalHour);
  }

  closeModal() {
    this.isClose = !this.isClose;
  }

  handleClick(title: string) {
    switch (title) {
      case 'Notificaciones':
        this.closeModal();
        break;
      case 'Cerrar sesión':
        this.isLogOut = false;
        setTimeout(() => {
          this.authService.logout();
        }, 2800);
    }
  }

  items = [
    {
      title: 'Inicio',
      icon: 'home',
      url: 'home',
    },
    {
      title: 'Gestionar asignaturas',
      icon: 'library_books',
      url: 'subjects',
    },
    {
      title: 'Gestionar docentes',
      icon: 'group',
      url: 'users',
      isAdmin: this.user?.role_id == 1 ? true : false,
    },
    {
      title: 'Crear facultad',
      icon: 'category',
      url: 'categories',
    },
    // {
    //   title: 'Gestionar docentes',
    //   icon: 'group',
    //   url: 'teachers',
    // },
    {
      title: 'Ayuda & Información',
      icon: 'info',
      url: 'help',
    },
    {
      title: 'Notificaciones',
      icon: 'notifications',
      // url: 'help'
    },
    {
      title: 'Configuraciones',
      icon: 'tune',
      url: 'settings',
    },
    {
      title: 'Cerrar sesión',
      icon: 'logout',
    },
  ];
}
