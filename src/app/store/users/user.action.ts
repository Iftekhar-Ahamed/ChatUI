import { LogedInUser, User } from "../../shared/models/user.model";

export namespace UserAction {
    export class SetUserData {
        static readonly type = '[SetUserData] Set User data';
        constructor(public user: User[]) { }
    }
    export class SelectUser {
        static readonly type = '[SelectUser] User Selected';
        constructor(public user: User) { }
    }
}       