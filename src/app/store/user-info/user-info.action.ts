import {LogInRequestDto} from "../../shared/models/user-log-in/user-log-in-request.model";

export namespace UserInfoAction
{
  export class userLogInAsync
  {
    static readonly type = 'UserLogInAsync';

    constructor(public payload: LogInRequestDto){}

  }

  export class userLogOutAsync
  {
    static readonly type = 'UserLogOutAsync';
    constructor() { }
  }
}
