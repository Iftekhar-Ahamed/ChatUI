import { Action, Select, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { UserAction } from './user.action';
import { LogedInUser, User } from "../../shared/models/user.model";
import { UserStatus, UserType } from "../../shared/enums/user.enum";

export interface UserStateModel {
    user: User[];
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        user: [{
            id: 1,
            name: "Iftekhar Ahamed",
            email: "iftekhar@email.com",
            avatar: "avater.jpg",
            status: UserStatus.Online,
            type: UserType.LoginUser
        }, {
            id: 2,
            name: "Al-Amin",
            email: "alamin@email.com",
            avatar: "avater.jpg",
            status: UserStatus.Offline,
            type: UserType.LoginUser
        }]
    }
})
@Injectable()
export class UserState {

    @Selector()
    static users(state: UserStateModel): User[] {
        return state.user;
    }

    constructor(
        private store: Store
    ) { }

    @Action(UserAction.SetUserData)
    async setUserData(ctx: StateContext<UserStateModel>, action: UserAction.SetUserData) {
        let state = ctx.getState();
        ctx.setState({
            ...state,
            user: action.user
        });
    }
}
