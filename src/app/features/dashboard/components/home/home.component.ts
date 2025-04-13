import { AfterViewInit, Component, OnInit, Signal } from '@angular/core';
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
import { UsersService } from '../../../../shared/services/users.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthService } from '../../../auth/auth.service';

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
  usersNumber: number = 0;
  user: any = null;

  constructor(
    public userService: UsersService,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    this.user = JSON.parse(this.authService.getUser());
    this.usersNumber = this.userService.users$().length
  }


  handleDateClick(arg: any) {
    alert('Fecha seleccionada: ' + arg.dateStr);
  }

  // getUser() {
  //   this.authService.getUser().subscribe((user) => {
  //     if (user) {
  //       this.authService.userLogged = user;
  //     }
  //   });
  // }

  itemsBanner = [
    {
      title: 'Teachers',
      value: this.usersNumber,
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
