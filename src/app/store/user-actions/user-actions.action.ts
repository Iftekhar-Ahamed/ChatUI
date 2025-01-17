import {UserSignUpRequest} from "../../shared/models/user-sign-up/user-sign-up.model";

export namespace UserActions
{
  export class searchUserAsync
  {
    static readonly type = 'searchUserAsync';

    constructor(public searchTerm: string){}
  }
  export class getAllMessageRequestsAsync
  {
    static readonly type = 'getAllMessageRequestsAsync';

    constructor(){}
  }
  export class sentMessageRequestAsync
  {
    static readonly type = 'sentMessageRequestAsync';

    constructor(public selfUserId:number,public otherUserId:number){}
  }
  export class createNewAccountAsync
  {
    static readonly type = 'createNewAccountAsync';

    constructor(public userInfo : UserSignUpRequest){}
  }
}
