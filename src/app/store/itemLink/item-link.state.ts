import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { ItemLinkAction } from './item-link.action';
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
            key: "/home",
            name: "Home",
            isSelected: false,
            path: "/home",
            isViewInHeader : true,
          },
          {
            key: "/all-chat",
            name: "All Chat",
            isSelected: false,
            path: "/all-chat",
            isViewInHeader : true,
          },
          {
            key: "/message-request",
            name: "Message Request",
            isSelected: false,
            path : "/message-request",
            isViewInHeader: true,
          },
          {
            key: "/profile",
            name: "profile",
            isSelected: false,
            path : "/profile",
            isViewInHeader : false,
          }
        ],
        pev: null,
        current: null
    }
})

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

  @Action(ItemLinkAction.ClearState)
  async clearState(ctx: StateContext<itemLinkStateModel>)
  {

      let state = ctx.getState();

      ctx.setState
      (
          {
              ...state,
              current:null,
              pev: null,
              items : []
          }
      );

  }

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

  @Action(ItemLinkAction.UpdateUrl)
  async updateChatListUrl(ctx: StateContext<itemLinkStateModel>, action: ItemLinkAction.UpdateUrl) {
    const state = ctx.getState();

    const updatedItems = state.items.map(item => {
      if (item.key === action.key) {
        return { ...item, path: action.url };
      }
      return item;
    });


    ctx.setState({
      ...state,
      items: updatedItems
    });
  }

  @Action(ItemLinkAction.SelectItemLink)
  async selectItem(ctx: StateContext<itemLinkStateModel>, action: ItemLinkAction.SelectItemLink) {

    const state = ctx.getState();

    if (state.current?.key === action.key) {
      return;
    }

    const actionItem = state.items.find(x => x.key === action.key);

    if(actionItem != undefined)
    {
      const updatedItems = state.items.map(item => {

        if (state.current && item.key === state.current.key) {
          return { ...item, isSelected: false };
        }

        if (item.key === action.key) {
          return { ...item, isSelected: true };
        }
        return item;
      });


      ctx.setState({
        ...state,
        items: updatedItems,
        pev: state.current || null,
        current: actionItem || null
      });
    }

  }

}