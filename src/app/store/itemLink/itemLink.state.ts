import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { ItemLinkAction } from './itemLink.action';
import { ItemLinkModel } from "../../shared/models/itemLink.model";

export interface itemLinkStateModel {
    items: ItemLinkModel[];
    pev: ItemLinkModel | null;
    current: ItemLinkModel | null;
}

@State<itemLinkStateModel>({
    name: 'itemLink',
    defaults: {
        items: [
            {
                id: 1,
                name: "All Chat",
                isSelected: false,
                url: "home/chatList"
            }, {
                id: 2,
                name: "Profile",
                isSelected: false,
                url: "home/profile"
            }
        ],
        pev: null,
        current: null
    }
})
@Injectable()
export class itemLinkState {

    @Selector()
    static itemList(state: itemLinkStateModel): ItemLinkModel[] {
        return state.items;
    }

    constructor(
        private store: Store
    ) { }

    @Action(ItemLinkAction.SetItemLinkData)
    async setUserData(ctx: StateContext<itemLinkStateModel>, action: ItemLinkAction.SetItemLinkData) {
        let state = ctx.getState();
        ctx.setState({
            ...state,
            items: action.items
        });
    }
    @Action(ItemLinkAction.SelectItemLink)
    async selectUser(ctx: StateContext<itemLinkStateModel>, action: ItemLinkAction.SelectItemLink) {
        let state = ctx.getState();

        if (state.current && state.current.id === action.item.id) {
            return;
        }

        if (state.current) {
            state.current.isSelected = false;
            const item = state.items.find(item => item.id === state.current?.id);
            if (item) {
                item.isSelected = false;
            }
        }

        action.item.isSelected = true;
        const temp = state.current;

        ctx.setState({
            ...state,
            current: action.item,
            pev: temp
        });
    }
}
