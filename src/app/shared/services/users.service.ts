import { Injectable, Signal, signal } from '@angular/core';
import { HttpService } from './http.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users = signal<any[]>([]);
  public userDetail = signal<any>(null);

  constructor(private http: HttpService) {}

  get users$(): Signal<any[]> {
    return this.users;
  }

  getAllUsers(): void {
    this.http
      .get('/users')
      .pipe(
        map((users) =>
          users.map((user: any) => ({
            id: user.user_id,
            name: user.full_name,
            email: user.email,
            level_training: user.level_training,
            role: user.role,
            working_day: user.working_day,
          }))
        )
      )
      .subscribe((users) => {
        this.users.set(users);
      });
  }

  getTeachers(): void {
    this.http
      .get('/users/role/2')
      .pipe(
        map((users) =>
          users.map((user: any) => ({
            id: user.user_id,
            name: user.full_name,
            email: user.email,
            role: user.role,
            level_training: user.level_training,
            working_day: user.working_day,
          }))
        )
      )
      .subscribe((users) => {
        this.users.set(users);
      });
  }

  getUserById(user_id: number): Observable<any> {
    return this.http.get(`/users/${user_id}`).pipe(
      map((user) =>
        user.map((user: any) => ({
          id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          level_training: user.level_training,
          working_day: user.working_day,
        }))
      ),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`/users/delete/${userId}`);
  }
}
