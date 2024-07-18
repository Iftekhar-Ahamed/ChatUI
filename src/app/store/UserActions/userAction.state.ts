import { Injectable } from "@angular/core";
import { Selector, State, Store } from "@ngxs/store";
import { SearchedUserResult, UserActionModel } from "../../shared/models/userAction.model";
import { GlobalUserStatus, UserStatus, UserType } from "../../shared/enums/user.enum";
export interface userActionStateModel
{
    userActions : UserActionModel,
    pev : null,
    cur : null
}

@State<userActionStateModel>
(
    {
        name:'userAction',
        defaults:
        {
            userActions:
            {
                searchKey : 'a',
                searchResult :
                [
                    {
                        id: "1",
                        name: "Al-Amin",
                        email: "alamin@email.com",
                        avatar: "avater.jpg",
                        status: UserStatus.Online,
                        type: UserType.OtherUser,
                        isSelected: false,
                        actionStatus : GlobalUserStatus.NotConnected
                    }
                ]
            },
            cur : null,
            pev : null
        }
    }
)

@Injectable()
export class userActionState{

    @Selector()
    static searchedResult( state : userActionStateModel):SearchedUserResult[]
    {
        return state.userActions.searchResult;
    }

    constructor( private store : Store){}

}