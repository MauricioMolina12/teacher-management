import { Component } from '@angular/core';
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

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
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

  constructor(public router: Router) {}

  closeModal() {
    this.isClose = !this.isClose;
  }

  handleClick(title: string) {
    switch (title) {
      case 'Notifications':
        this.closeModal();
        break;
      case 'Log out':
        this.isLogOut = false;

        setTimeout(() => {
          this.router.navigate(['/user/login']);
        }, 2800);
    }
  }

  items = [
    {
      title: 'home',
      icon: 'home',
      url: 'home',
    },
    {
      title: 'Manage Subjects',
      icon: 'library_books',
      url: 'subjects',
    },
    {
      title: 'Create User',
      icon: 'person_add',
      url: 'users',
    },
    {
      title: 'Create Faculty',
      icon: 'category',
      url: 'categories',
    },
    {
      title: 'Manage teachers',
      icon: 'group',
      url: 'teachers',
    },
    {
      title: 'Help & Information',
      icon: 'info',
      url: 'help',
    },
    {
      title: 'Notifications',
      icon: 'notifications',
      // url: 'help'
    },
    {
      title: 'Settings',
      icon: 'tune',
      url: 'settings',
    },
    {
      title: 'Log out',
      icon: 'logout',
    },
  ];
}
