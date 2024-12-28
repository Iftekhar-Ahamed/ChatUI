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
}
