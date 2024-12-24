import { Injectable } from "@angular/core";
import { Selector, State, Store } from "@ngxs/store";
import { SearchedUserResult, UserActionModel } from "../../shared/models/userAction.model";
import { GlobalUserStatus, UserStatus, UserType } from "../../shared/enums/user.enum";
export interface UserActionStateModel
{
    userActions : UserActionModel,
    pev : null,
    cur : null
}

@State<UserActionStateModel>
(
    {
        name:'userAction',
        defaults:
        {
            userActions:
            {
                searchKey : 'a',
                searchResult :
                []
            },
            cur : null,
            pev : null
        }
    }
)

@Injectable()
export class UserActionState{

    @Selector()
    static searchedResult( state : UserActionStateModel):SearchedUserResult[]
    {
        return state.userActions.searchResult;
    }

    constructor( private store : Store){}

}
