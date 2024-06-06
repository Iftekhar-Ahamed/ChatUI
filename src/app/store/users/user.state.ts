import { Action, Select, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { UserAction } from './user.action';
import { LogedInUser, User } from "../../shared/models/user.model";
import { UserStatus, UserType } from "../../shared/enums/user.enum";
import { cloneDeep } from 'lodash';

export interface UserStateModel {
    user: User[];
    pev: User | null;
    current: User | null;
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
            type: UserType.LoginUser,
            lastMessage: "Hello",
            isSelected: false
        }, {
            id: 2,
            name: "Al-Amin",
            email: "alamin@email.com",
            avatar: "avater.jpg",
            status: UserStatus.Offline,
            type: UserType.LoginUser,
            lastMessage: "Bye",
            isSelected: false
        }],
        pev: null,
        current: null
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
    @Action(UserAction.SelectUser)
    async selectUser(ctx: StateContext<UserStateModel>, action: UserAction.SelectUser) {
        let state = ctx.getState();

        if (state.current && state.current.id === action.user.id) {
            return;
        }

        if (state.current) {
            state.current.isSelected = false;
            const user = state.user.find(user => user.id === state.current?.id);
            if (user) {
                user.isSelected = false;
            }
        }

        action.user.isSelected = true;
        const temp = state.current;

        ctx.setState({
            ...state,
            current: action.user,
            pev: temp
        });
    }
}
