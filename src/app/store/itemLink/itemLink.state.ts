import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { ItemLinkAction } from './itemLink.action';
import { ItemLinkModel } from "../../shared/models/itemLink.model";

export interface itemLinkStateModel 
{
    items: ItemLinkModel[];
    pev: ItemLinkModel | null;
    current: ItemLinkModel | null;
}

@State<itemLinkStateModel>({
    name: 'itemLink',
    defaults: 
    {
        items: [
            {
                key: "home/chatList",
                name: "All Chat",
                isSelected: false,
                url: "chatList"
            }, {
                key: "home/profile",
                name: "Profile",
                isSelected: false,
                url: "profile"
            },
            {
                key: "home/chat",
                name: "Chat",
                isSelected: false,
                url: "chat"
            },{
                key: "home/chatFriends",
                name: "Chat Friends",
                isSelected: false,
                url: "chatFriends"
            },
        ],
        pev: null,
        current: null
    }
)

@Injectable()
export class itemLinkState {

    @Selector()
    static itemList(state: itemLinkStateModel): ItemLinkModel[] 
    {
        return state.items;
    }

    constructor(
        private store: Store
    ) { }

    @Action(ItemLinkAction.SetItemLinkData)
    async setItemListData(ctx: StateContext<itemLinkStateModel>, action: ItemLinkAction.SetItemLinkData) 
    {

        let state = ctx.getState();

        ctx.setState
        (
            {
                ...state,
                items: action.items
            }
        );

    }

    @Action(ItemLinkAction.SelectItemLink)
    async selectItem(ctx: StateContext<itemLinkStateModel>, action: ItemLinkAction.SelectItemLink)
    {

        let state = ctx.getState();


        if (state.current && state.current.key === action.key) 
        {
            return;
        }

        const actionItem = state.items.find(x => x.key == action.key);

        if (state.current) 
        {

            state.current.isSelected = false;
            const item = state.items.find(item => item.key === state.current?.key);

            if (item)
            {
                item.isSelected = false;
            }

        }

        const temp = state.current;

        if (actionItem) 
        {

            actionItem.isSelected = true;


            ctx.setState
            (
                {
                    ...state,
                    current: actionItem,
                    pev: temp
                }
            );

        } 
        else 
        {

            ctx.setState
            (
                {
                    ...state,
                    current: null,
                    pev: temp
                }
            );

        }
    }
}
