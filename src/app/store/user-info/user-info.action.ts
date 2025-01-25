import {LogInRequestDto} from "../../shared/models/user-log-in/user-log-in-request.model";
import {UserInformationDto} from "../../shared/models/user-info/user-info-response.model";

export namespace UserInfoAction
{
  export class UserLogInAsync
  {
    static readonly type = 'UserLogInAsync';

    constructor(public payload: LogInRequestDto){}

  }
  export class UpdateUserInfoAsync
  {
    static readonly type = 'UpdateUserInfoAsync';

    constructor(public payload: UserInformationDto){}

  }

  export class UserLogOutAsync
  {
    static readonly type = 'UserLogOutAsync';
    constructor() { }
  }
}
