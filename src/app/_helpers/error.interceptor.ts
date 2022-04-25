import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../_services/user.service';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private userService: UserService,
        private notifierService: NotifierService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.userService.userValue) {
                this.userService.logout();
            }

            const error = err.error?.message || err.statusText;
            this.notifierService.notify('error', error);
            return throwError(error);
        }))
    }
}