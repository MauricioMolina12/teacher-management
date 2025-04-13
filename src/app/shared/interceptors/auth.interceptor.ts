import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(AuthService);
  const router = inject(Router);

  let clonedRequest = req;
  let pathRequest = req.url;

  // Obtener el token del almacenamiento
  let token = userService.getAuthToken();
  let refreshToken = userService.getRefreshToken();
  let tokenASubmit = '';

  // Si no hay token, pasamos la solicitud sin modificarla
  if (!token) {
    return next(req);
  }

  tokenASubmit = pathRequest.includes('/logout') ? refreshToken : token;

  // Clonamos la solicitud para añadir el token al header
  clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tokenASubmit}`,
    },
  });

  return next(clonedRequest).pipe(
    catchError((err) => {
      // Si el error es un 401, intentamos refrescar el token
      if (err.status === 401) {
        return userService.refreshAccessToken().pipe(
          switchMap((res) => {
            // Si se refresca el token, actualizamos el localStorage
            token = res?.access_token;
            localStorage.setItem('token', token);

            // Clonamos nuevamente la solicitud con el nuevo token
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });

            // Procedemos con la nueva solicitud
            return next(newReq);
          }),
          catchError((refreshErr) => {
            // Si falla el refresh token, eliminamos los datos y redirigimos al login
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            router.navigate(['/login']);
            return throwError(() => new Error('Refresh token failed'));
          })
        );
      }

      // Si no es un 401, pasamos el error
      return throwError(() => err);
    })
  );
};
