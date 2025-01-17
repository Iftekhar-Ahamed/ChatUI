import { Action, Select, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { ChatListAction } from './chatList.action';
import { User } from "../../shared/models/user.model";
import { UserStatus, UserType } from "../../shared/enums/user.enum";
import { ChatListModel, StartNewChatProperty } from "../../shared/models/chatList.model";
import {NameElementDto} from "../../shared/models/user-info/user-info-response.model";

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
                [],
                startNewChat :
                {
                    isSelected : false,
                }
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
    @Selector()
    static newChat(state: chatListStateModel): StartNewChatProperty
    {
        return state.chatList.startNewChat;
    }


    constructor(
        private store: Store
    ) { }

    //#region  Actions

    @Action(ChatListAction.SetUserData)
    async setUserData(ctx: StateContext<chatListStateModel>, action: ChatListAction.SetUserData)
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

    @Action(ChatListAction.ClearState)
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

    @Action(ChatListAction.SelectUser)
    async selectUser(ctx: StateContext<chatListStateModel>, action: ChatListAction.SelectUser) {
        let state = ctx.getState();
        if (state.current && state.current.id === action.userId) {
            return;
        }
        const actionUser = state.chatList.users.find( x => x.id === action.userId);

        if (state.current) {
            state.current.isSelected = false;
            const user = state.chatList.users.find(user => user.id === state.current?.id);
            if (user) {
                user.isSelected = false;
            }
        }

        if(state.chatList.startNewChat.isSelected)
        {
            state.chatList.startNewChat.isSelected = false;
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

    @Action(ChatListAction.SelectNewChat)
    async selectNewChat(ctx: StateContext<chatListStateModel>, action: ChatListAction.SelectNewChat)
    {

        let state = ctx.getState();

        if(state.chatList.startNewChat.isSelected)
        {
            return;
        }

        if (state.current && state.current.isSelected)
        {
            let user = state.chatList.users.find( x => x.id === state.current?.id);
            if(user){user.isSelected = false;}
            const temp = state.current;

            ctx.setState({
                ...state,
                current: null,
                pev: temp
            });

        }

        state.chatList.startNewChat.isSelected = true;
    }
    //#endregion Actions
}
