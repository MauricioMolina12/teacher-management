import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private httpService: HttpService) {}

  getAllUsers(): void {
    this.httpService.get('/users').subscribe((users) => {
      this.usersSubject.next(users); 
    });
  }
}
