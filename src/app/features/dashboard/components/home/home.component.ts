import { Component, OnInit } from '@angular/core';
import {
  faBookmark,
  faGrip,
  faHomeLgAlt,
  faUserPlus,
  faUserGroup,
  faCircleInfo,
  faGear,
  faRightFromBracket,
  faCaretUp,
  faArrowTrendUp,
  faArrowTrendDown,
} from '@fortawesome/free-solid-svg-icons';
import { HttpService } from '../../../../shared/services/http.service';
import { Observable } from 'rxjs';
import { UsersService } from '../../../../shared/services/users.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // Icons
  faHome = faHomeLgAlt;
  faBook = faBookmark;
  faCreateUser = faUserPlus;
  faGrid = faGrip;
  faUsers = faUserGroup;
  faInfo = faCircleInfo;
  faSettings = faGear;
  faDoor = faRightFromBracket;
  faArrowTrendUp = faArrowTrendUp;
  faArrowTrendDown = faArrowTrendDown;
  faArrowUp = faCaretUp;

  percentaje: number = 12;
  users: any[] = [];

  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.getAllUsers();    
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  itemsBanner = [
    {
      title: 'Teachers',
      value: 18,
      icon: this.faUsers,
    },
    {
      title: 'Efficiency',
      value: 93,
      percentaje: this.percentaje,
      icon: this.percentaje > 0 ? this.faArrowTrendUp : this.faArrowTrendDown,
    },
    {
      title: 'Subjects',
      value: 50,
      icon: this.faBook,
    },
  ];
}
