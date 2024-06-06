import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { LogedInUser } from "../../shared/models/user.model";
import { UserStatus, UserType } from "../../shared/enums/user.enum";
import { Injectable } from "@angular/core";
import { UserAction } from "../users/user.action";
import { logedInUserAction } from "./logedInUser.action";

export interface LogedInUserStateModel {
    logedInUser: LogedInUser | null;
}

@State<LogedInUserStateModel>({
    name: 'logedInUser',
    defaults: {
        logedInUser: {
            id: 1,
            name: "Iftekhar Ahamed",
            email: "iftekhar@email.com",
            avatar: "avater.jpg",
            status: UserStatus.Online,
            type: UserType.LoginUser,
            token: "Not found"
        }
    }
})
@Injectable()
export class UserState {

    @Selector()
    static userNameOrEmail(state: LogedInUserStateModel): string {
        return state.logedInUser?.name ?? state.logedInUser?.email ?? "";
    }

    @Selector()
    static user(state: LogedInUserStateModel): LogedInUser | null {
        return state.logedInUser;
    }

    @Selector()
    static token(state: LogedInUserStateModel): string {
        return state.logedInUser?.token ?? "";
    }

    constructor(
        private store: Store
    ) { }

    @Action(logedInUserAction.SetUserData)
    async setUserData(ctx: StateContext<LogedInUserStateModel>, action: logedInUserAction.SetUserData) {
        let state = ctx.getState();
        ctx.setState({
            ...state,
            logedInUser: action.user
        });
    }
    @Action(logedInUserAction.Logout)
    async Logout(ctx: StateContext<LogedInUserStateModel>) {
        const currentState = ctx.getState();

        // Check if the users is already logged out
        if (currentState.logedInUser === null) {
            return;
        }

        // Clear users state
        ctx.setState({
            logedInUser: null,
        });

        // Reload the page
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    }
}