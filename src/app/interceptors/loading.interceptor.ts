import { Injectable } from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor( private  spinner: NgxSpinnerService ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("Loading interceptor");

    this.spinner.show();

    const MINIMUM_SPINNER_TIME = 300;
    const startTime = Date.now();

    return next.handle(request).pipe(
      finalize(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = MINIMUM_SPINNER_TIME - elapsedTime;

        if (remainingTime > 0) {
          setTimeout(() => {
            this.spinner.hide();
          }, remainingTime);
        } else {
          this.spinner.hide();
        }
      })
    );
  }
}
