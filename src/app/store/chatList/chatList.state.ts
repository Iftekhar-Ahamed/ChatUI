import { Action, Select, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { UserAction } from './chatList.action';
import { User } from "../../shared/models/user.model";
import { UserStatus, UserType } from "../../shared/enums/user.enum";
import { ChatListModel } from "../../shared/models/chatList.model";

export interface chatListStateModel 
{
    chatList: ChatListModel ;
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
                        id: "1",
                        name: "Al-Amin",
                        email: "alamin@email.com",
                        avatar: "avater.jpg",
                        status: UserStatus.Online,
                        type: UserType.OtherUser,
                        isSelected: false
                    }, 
                    {
                        id: "2",
                        name: "Sihab",
                        email: "sihab@email.com",
                        avatar: "avater.jpg",
                        status: UserStatus.Offline,
                        type: UserType.OtherUser,
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

    @Action(UserAction.ClearState)
    async clearState(ctx: StateContext<chatListStateModel>) 
    {
        let state = ctx.getState();
        state.chatList.users = [];

        ctx.setState
        (
            {
                ...state,
                current:null,
                pev: null,
            }
        );
    }

    @Action(UserAction.SelectUser)
    async selectUser(ctx: StateContext<chatListStateModel>, action: UserAction.SelectUser) {
        let state = ctx.getState();

        if (state.current && state.current.id === action.userId) {
            return;
        }
        const actionUser = state.chatList?.users.find( x => x.id === action.userId);

        if (state.current) {
            state.current.isSelected = false;
            const user = state.chatList?.users.find(user => user.id === state.current?.id);
            if (user) {
                user.isSelected = false;
            }
        }
        
        if(actionUser)
        {
            actionUser.isSelected = true;
            const temp = state.current;

            ctx.setState({
                ...state,
                current: actionUser,
                pev: temp
            });
        }else{
            const temp = state.current;

            ctx.setState({
                ...state,
                current: null,
                pev: temp
            });
        }
    }
    //#endregion Actions
}
