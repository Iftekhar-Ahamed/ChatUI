import { LogedInUser } from "../../shared/models/user.model";

export namespace logedInUserAction {
    export class SetUserData {
        static readonly type = '[SetUserData] Set User data';
        constructor(public user: LogedInUser) { }
    }
    export class Logout {
        static readonly type = '[Logout] Removes User data';
        constructor() { }
    }
}   