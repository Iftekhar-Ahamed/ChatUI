import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, switchMap, take, throwError } from "rxjs";
import {ApiService} from "../services/api-service.service";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import {UserInfoState} from "../store/user-info/user-info.state";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private refreshTokenInProgress: Observable<any> | null = null;

  constructor(private store: Store, private router: Router, private apiService: ApiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.store.select(UserInfoState.getAccessToken).pipe(
      take(1),
      switchMap(token => {
        if (token) {
          request = this.addTokenHeader(request, token);
        }
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) =>
          {
            if (error.status === 401) {
              return this.handle401Error(request, next);
            }

            return throwError(error);
          })
        );
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.store.select(UserInfoState.getAccessToken).pipe(
        take(1),
        switchMap(refreshToken => {

          this.router.navigate(['welcome/sign-in']);
          return throwError('No refresh token available');

          // this.refreshTokenInProgress = this.apiService.getAccessToken(refreshToken).pipe(
          //   switchMap((newTokens: UserLoginResponse | null) => {
          //     if (!newTokens) {
          //       this.store.dispatch(new userAuthenticateAction.ClearResult());
          //       this.router.navigate(['/login']);
          //       return throwError('Failed to refresh token');
          //
          //     }
          //     this.store.dispatch(new userAuthenticateAction.UpdateTokens(newTokens.token, newTokens.refreshToken));
          //
          //     request = this.addTokenHeader(request, newTokens.token);
          //     return next.handle(request);
          //   }),
          //   catchError(err => {
          //     this.store.dispatch(new userAuthenticateAction.ClearResult());
          //     this.router.navigate(['/login']);
          //     return throwError(err);
          //   }),
          //
          //   switchMap(response => {
          //     return of(response);
          //   })
          // );
          //
          // return this.refreshTokenInProgress;
        })
      );
  }

  private addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
  }
}
