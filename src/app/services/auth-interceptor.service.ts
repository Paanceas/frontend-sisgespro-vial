import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Util } from '../common/util';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  util: Util = new Util();

  constructor(private _router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.util.getObj('token');
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          Auth: `${token}`,
        },
      });
    }
    return next.handle(request).pipe(catchError(this.setErrors));
  }

  setErrors(error: HttpErrorResponse) {
    if (error.status === 401) {
      window.location.href = '/#/unauthorized';
    }
    return throwError(error);
  }
}
