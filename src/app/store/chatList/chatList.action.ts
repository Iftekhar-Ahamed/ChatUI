import { ChatListModel } from "../../shared/models/chatList.model";
import { LogedInUser, User } from "../../shared/models/user.model";

export namespace ChatListAction 
{
    export class SetUserData 
    {
        static readonly type = '[SetUserData] Set ChatList data';
        constructor(public chatLists: ChatListModel) { }
    }
    
    export class SelectUser 
    {
        static readonly type = '[SelectUser] User Selected';
        constructor(public userId: string) { }
    }
    export class ClearState 
    {
        static readonly type = '[ClearState] ClearState called';
        constructor() { }
    }
}       