import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../../../shared/services/users.service';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  constructor(private userService: UsersService) {}

  private activateRoute = inject(ActivatedRoute);
  users$ = computed(() => this.userService.userDetail());
  avatar: string = '';

  user_id: any;
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((param) => {
      this.user_id = param.get('id');
      this.userService.getUserById(this.user_id).subscribe((response) => {
        this.userService.userDetail.set(response[0]);
      });
      console.log(this.users$());
    });
  }
}
