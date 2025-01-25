import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {ApiResponseDto} from "../shared/models/common/api-response.model";
import {LogInResponseDto} from "../shared/models/user-log-in/user-log-in-response.model";
import {LogInRequestDto} from "../shared/models/user-log-in/user-log-in-request.model";
import {UserInformationDto} from "../shared/models/user-info/user-info-response.model";
import {environment} from "../environments/environment";
import {SearchResultModel} from "../shared/models/search-result/search-result.model";
import {CancelMessageRequest, SendMessageRequest} from "../shared/models/chat/message-request.model";
import {UserSignUpRequest} from "../shared/models/user-sign-up/user-sign-up.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseUrl: string = environment.baseUrl;

    constructor(private httpClient: HttpClient) {
    }

    handleError(error: HttpErrorResponse) {
        console.log(error);
        return of(null);
    }

    private getData(url: string): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}${url}`).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    private deleteData(url: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}${url}`).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    private downloadData(url: string): Observable<Blob> {
        return this.httpClient.get<Blob>(`${this.baseUrl}${url}`, {responseType: 'blob' as 'json'});
    }

    private postData(url: string, data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post<any>(`${this.baseUrl}${url}`, data, {headers});
    }

    userLogin(payload: LogInRequestDto): Observable<ApiResponseDto<LogInResponseDto> | null> {
        return this.postData(`/api/Auth/LogIn`, payload).pipe(
            map((response: ApiResponseDto<LogInResponseDto>) => response),
            catchError(this.handleError)
        );
    }

    userSignUp(payload: UserSignUpRequest): Observable<ApiResponseDto<string> | null> {
        return this.postData(`/api/User/CreateUser`, payload).pipe(
            map((response: ApiResponseDto<string>) => response),
            catchError(this.handleError)
        );

    }

    getUserInfo(): Observable<UserInformationDto | null> {
        return this.getData('/api/User/GetUser').pipe(
            map((response: ApiResponseDto<UserInformationDto>) => response.data),
            catchError(this.handleError)
        );

    }

    searchUserAsync(searchTerm: string): Observable<SearchResultModel[] | null> {

        return this.getData(`/api/Chat/SearchChatUser/SearchTerm=${searchTerm}&PageNo=1&PageSize=10`).pipe
        (
            map((response: ApiResponseDto<SearchResultModel[]>) => response.data),
            catchError(this.handleError)
        );

    }

    getAllMessageRequests(): Observable<SearchResultModel[] | null> {

        return this.getData(`/api/User/SearchChatUser/`).pipe
        (
            map((response: ApiResponseDto<SearchResultModel[]>) => response.data),
            catchError(this.handleError)
        );

    }

    sentMessageRequest(payload: SendMessageRequest): Observable<boolean | null> {
        console.log(payload);
        return this.postData(`/api/Chat/SentChatFriendRequest`, payload).pipe
        (
            map(rsp => rsp.success as boolean),
            catchError(this.handleError)
        );

    }

    cancelMessageRequest(payload: CancelMessageRequest): Observable<boolean | null> {
        console.log(payload);
        return this.postData(`/api/Chat/CancelChatFriendRequest`, payload).pipe
        (
            map(rsp => rsp.success as boolean),
            catchError(this.handleError)
        );

    }

    updateUserInfo(payload: UserInformationDto): Observable<boolean | null> {
        console.log(payload);
        return this.postData(`/api/User/UpdateUser`, payload).pipe
        (
            map(rsp => rsp.success as boolean),
            catchError(this.handleError)
        );

    }

}
