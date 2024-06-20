import { Action, Select, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { UserAction } from './chatList.action';
import { User } from "../../shared/models/user.model";
import { UserStatus, UserType } from "../../shared/enums/user.enum";
import { ChatListModel } from "../../shared/models/chatList.model";

export interface chatListStateModel 
{
    chatList: ChatListModel;
    pev: User | null;
    current: User | null;
}

@State<chatListStateModel>
(
    {
        name: 'chatList',
        defaults: 
        {
            chatList: 
            {
                users: 
                [
                    {
                        id: 1,
                        name: "Iftekhar Ahamed",
                        email: "iftekhar@email.com",
                        avatar: "avater.jpg",
                        status: UserStatus.Online,
                        type: UserType.LoginUser,
                        lastMessage: "Hello",
                        isSelected: false
                    }, 
                    {
                        id: 2,
                        name: "Al-Amin",
                        email: "alamin@email.com",
                        avatar: "avater.jpg",
                        status: UserStatus.Offline,
                        type: UserType.LoginUser,
                        lastMessage: "Bye",
                        isSelected: false
                    }
                ]
            },
            pev: null,
            current: null
        }
    }
)

@Injectable()
export class ChatListState 
{

    @Selector()
    static chatLists(state: chatListStateModel): ChatListModel 
    {
        return state.chatList;
    }

    
    constructor(
        private store: Store
    ) { }

    //#region  Actions

    @Action(UserAction.SetUserData)
    async setUserData(ctx: StateContext<chatListStateModel>, action: UserAction.SetUserData)
    {
        let state = ctx.getState();

        ctx.setState
        (
            {
                ...state,
                chatList: action.chatLists
            }
        );
    }

    @Action(UserAction.SelectUser)
    async selectUser(ctx: StateContext<chatListStateModel>, action: UserAction.SelectUser) {
        let state = ctx.getState();

        if (state.current && state.current.id === action.user.id) {
            return;
        }

        if (state.current) {
            state.current.isSelected = false;
            const user = state.chatList.users.find(user => user.id === state.current?.id);
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
    //#endregion Actions
}
