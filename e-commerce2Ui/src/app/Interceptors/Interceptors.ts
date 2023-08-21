import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { AuthModel } from '../models/model';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    var myToken = this.authService.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handelUnAuthorizedError(request, next);
          }
        }
        return throwError(() => err);
      })
    );
  }
  handelUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let refreshToken = this.authService.getRefreshToken();
    if (refreshToken == null) {
      return throwError(() => 'Token Invalid');
    }
    return this.authService.RenewToken(refreshToken).pipe(
      switchMap((data: AuthModel) => {
        console.log(data);
        this.authService.saveToken(data.token);
        this.authService.saveRefreshToken(data.refreshToken);
       req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.token}` },
        });
        return next.handle(req);
      }),
      catchError((err) => {
        return throwError(() => {
          // this.authService.logout();
          alert('Your Token Is Invalid Please Login Again');
        });
      })
    );
  }
}
