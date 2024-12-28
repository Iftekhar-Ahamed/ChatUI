import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {ApiResponseDto} from "../shared/models/common/api-response.model";
import {LogInResponseDto} from "../shared/models/user-log-in/user-log-in-response.model";
import {LogInRequestDto} from "../shared/models/user-log-in/user-log-in-request.model";
import {UserInformationDto} from "../shared/models/user-info/user-info-response.model";
import {environment} from "../environments/environment";
import {SearchResultModel} from "../shared/models/search-result/search-result.model";
import {SendMessageRequest} from "../shared/models/chat/message-request.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl : string = environment.baseUrl;

  constructor(private httpClient : HttpClient) { }

  handleError(error: HttpErrorResponse) {
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
    return this.httpClient.get<Blob>(`${this.baseUrl}${url}`, { responseType: 'blob' as 'json' });
  }

  private postData(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<any>(`${this.baseUrl}${url}`, data, { headers });
  }

  userLogin(payload : LogInRequestDto): Observable<ApiResponseDto<LogInResponseDto> | null>
  {
    return this.postData(`/api/Auth/LogIn`, payload).pipe(
      map((response: ApiResponseDto<LogInResponseDto>) => response),
      catchError(this.handleError)
    );

  }

  getUserInfo(): Observable<UserInformationDto | null>
  {
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

  sentMessageRequest(payload:SendMessageRequest): Observable<string | null> {
    console.log(payload);
    return this.postData(`/api/Chat/SentChatFriendRequest`,payload).pipe
    (
      map(rsp => rsp.data as string),
      catchError(this.handleError)
    );

  }

}
