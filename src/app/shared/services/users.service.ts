import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private httpService: HttpService) {}

  getAllUsers(): Observable<any[]> {
    // Si los datos ya existen en el servicio, retornamos los almacenados
    if (this.usersSubject.value) {
      return of(this.usersSubject.value);
    }
    
    // Si no hay datos, hacemos la petición y los almacenamos
    return this.httpService.get('/users').pipe(
      tap((users) => this.usersSubject.next(users))
    );
  }
}
