export namespace UserActions
{
  export class searchUserAsync
  {
    static readonly type = 'searchUserAsync';

    constructor(public searchTerm: string){}

  }
}
