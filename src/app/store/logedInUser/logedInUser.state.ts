import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { LogedInUser } from "../../shared/models/user.model";
import { Injectable } from "@angular/core";
import { logedInUserAction } from "./logedInUser.action";

export interface LogedInUserStateModel 
{
    logedInUser: LogedInUser | null;
}

@State<LogedInUserStateModel>
(
    {
        name: 'logedInUser',
        defaults: 
        {
            logedInUser: 
            {
                id: 1,
                name: "Iftekhar Ahamed",
                email: "iftekhar@email.com",
                avatar: "avater.jpg",
                token: "Not found"
            }
        }
    }
)
@Injectable()
export class UserState 
{

    @Selector()
    static userNameOrEmail(state: LogedInUserStateModel): string 
    {
        return state.logedInUser?.name ?? state.logedInUser?.email ?? "";
    }

    @Selector()
    static user(state: LogedInUserStateModel): LogedInUser | null 
    {
        return state.logedInUser;
    }

    @Selector()
    static token(state: LogedInUserStateModel): string 
    {
        return state.logedInUser?.token ?? "";
    }

    constructor(
        private store: Store
    ) { }

    @Action(logedInUserAction.SetUserData)
    async setUserData(ctx: StateContext<LogedInUserStateModel>, action: logedInUserAction.SetUserData) 
    {
        let state = ctx.getState();
        ctx.setState
        (
            {
                ...state,
                logedInUser: action.user
            }
        );
    }

    @Action(logedInUserAction.Logout)
    async Logout(ctx: StateContext<LogedInUserStateModel>) 
    {
        const currentState = ctx.getState();

        if (currentState.logedInUser === null) 
        {
            return;
        }

        ctx.setState
        (
            {
                logedInUser: null,
            }
        );

        
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    }
}