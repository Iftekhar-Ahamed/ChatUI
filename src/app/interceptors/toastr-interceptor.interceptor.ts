import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ApiResponseDto} from "../shared/models/common/api-response.model";

@Injectable({
    providedIn: 'root', // Ensure this is provided in standalone mode
})
export class ToastrInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const rsp: ApiResponseDto<string | null> | null = event.body
                        ? (event.body as ApiResponseDto<string | null>)
                        : null;

                    if (rsp && rsp.showMessage) {
                        this.toastr.success(rsp.message || 'Operation completed successfully.');
                    }
                }
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 400) {

                    const rsp: ApiResponseDto<string | null> | null = error.error
                        ? (error.error as ApiResponseDto<string | null>)
                        : null;

                    if (rsp) {

                        let hasErrorBreakDown = false;
                        if (rsp.showMessage) {
                            if (rsp.error?.errorDetails) {
                                for (const item of rsp.error.errorDetails) {
                                    hasErrorBreakDown = true;
                                    this.toastr.error(item.value);
                                }
                            }
                        }

                        if(!hasErrorBreakDown)
                        {
                            this.toastr.error(rsp.message || 'An error occurred.');
                        }
                    } else {
                        this.toastr.error('An unknown server error occurred.', 'Error');
                    }
                } else if (error.status >= 500) {
                    this.toastr.error('A server error occurred. Please try again later.', 'Server Error');
                }
                throw error;
            })
        );
    }
}
