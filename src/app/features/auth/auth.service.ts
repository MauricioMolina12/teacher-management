import { inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoggedSubject = new BehaviorSubject<any | null>(null);
  userLogged$ = this.userLoggedSubject.asObservable();

  isActiveSessionSubject = new BehaviorSubject<boolean>(false);
  isActiveSession$ = this.isActiveSessionSubject.asObservable();

  private router = inject(Router);

  constructor(private http: HttpService) {
    // this.loadUserFromStorage();
  }

  /** ================================
   *  Login and autentication
   @param email Receive the user's email
   @param password Receive the user's password
   @returns Returns an observable with the post information
   ================================ */
  login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };
    return this.http.post('/users/login', body).pipe(
      tap((res) => {
        const user = res?.user;
        this.userLoggedSubject.next(user);
        if (!res?.active_session) {
          this.isActiveSessionSubject.next(false);
          // Guardamos los datos del usuario en localStorage
          this.setUser(user);
          // Guardamos los tokens en localStorage
          this.createTokens(user?.user_id).subscribe((response) => {
            if (response?.refresh_token) {
              this.setTokens(response);
              this.router.navigate(['/dashboard']);
            } else {
              throw new Error('Credenciales incorrectas');
            }
          });
        } else {
          this.isActiveSessionSubject.next(true);
        }
      }),
      catchError((err) => {
        console.error('Error generating tokens:', err);
        throw err;
      })
    );
  }

  setTokens(response: any): void {
    localStorage.setItem('token', response?.access_token);
    localStorage.setItem('refreshToken', response?.refresh_token);
  }

  /**
   * @returns Get the token User
   */
  getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * @returns Get the refresh Token user
   */
  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') || '';
  }

  /**
   *
   * @returns It is responsible for creating the refresh token
   */
  refreshAccessToken(): Observable<any> {
    return this.http
      .post('/users/refresh', { refreshToken: this.getRefreshToken() })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res?.access_token);
        })
      );
  }

  /** ================================
   *  USER MANAGEMENT
   *  ================================ */
  getUser(): any {
    const user = localStorage.getItem('user') || '';
    if (user) {
      return user;
    }
  }

  public setUser(user: any): void {
    this.userLoggedSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  logout(): void {
    this.http
      .delete('/users/logout')
      .pipe(
        tap((res) => {
          console.log(res);
          this.removeItemsOfLocalStorage();
          this.userLoggedSubject.next(null);
          this.router.navigate(['/user/login']);
        })
      )
      .subscribe();
  }

  removeItemsOfLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  /** ================================
   *  TOKEN MANAGEMENT
   *  ================================ */
  createTokens(userId: number): Observable<any> {
    return this.http
      .post('/users/createTokens', { user_id: userId }, true)
      .pipe(
        catchError((err) => {
          console.error('Error generating tokens:', err);
          throw err;
        })
      );
  }

  isAuthenticated() {
    return !localStorage.getItem('token') ? false : true;
  }
}
