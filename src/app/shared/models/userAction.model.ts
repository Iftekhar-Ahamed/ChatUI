import { GlobalUserStatus } from "../enums/user.enum";
import { User } from "./user.model";

export interface UserActionModel{
    searchResult : SearchedUserResult[],
    searchKey : string
}
export interface SearchedUserResult extends User{
    actionStatus:GlobalUserStatus,
}