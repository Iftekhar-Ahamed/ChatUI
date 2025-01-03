import { ChatListModel } from "../../shared/models/chatList.model";

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

    export class SelectNewChat
    {
        static readonly type = '[SelectNewChat] Start new chat Selected'
        constructor(){}
    }

    export class ClearState
    {
        static readonly type = '[ClearState] ClearState called';
        constructor() { }
    }
}
