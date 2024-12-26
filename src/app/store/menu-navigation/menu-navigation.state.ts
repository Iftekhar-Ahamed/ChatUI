import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import {MenuNavigationAction} from './menu-navigation.action';
import { MenuConfigModel} from "../../shared/models/menu-config.model";

export interface NavigationStateModel
{

    items: MenuConfigModel[];
    pev: MenuConfigModel | null;
    current: MenuConfigModel | null;
}

@State<NavigationStateModel>({
    name: 'menuConfig',
    defaults:
    {
        items: [
          {
            key: "/home",
            name: "Home",
            isSelected: false,
            basePath: "/home",
            currentPath : null,
            pevPath:null,
            isViewInHeader : true,
          },
          {
            key: "/all-chat",
            name: "All Chat",
            isSelected: false,
            basePath: "/all-chat",
            currentPath : null,
            pevPath:null,
            isViewInHeader : true,
          },
          {
            key: "/message-request",
            name: "Message Request",
            isSelected: false,
            basePath : "/message-request",
            currentPath : null,
            pevPath:null,
            isViewInHeader: true,
          },
          {
            key: "/profile",
            name: "profile",
            isSelected: false,
            basePath : "/profile",
            currentPath : null,
            pevPath:null,
            isViewInHeader : false,
          }
        ],
        pev: null,
        current: null
    }
})

@Injectable()
export class MenuNavigationState {

    @Selector()
    static getMenuList(state: NavigationStateModel): MenuConfigModel[]
    {
        return state.items;
    }

    constructor(
        private store: Store
    ) { }

  @Action(MenuNavigationAction.ClearState)
  async clearState(ctx: StateContext<NavigationStateModel>)
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

  @Action(MenuNavigationAction.SetMenuData)
  async setMenuListData(ctx: StateContext<NavigationStateModel>, action: MenuNavigationAction.SetMenuData)
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

  @Action(MenuNavigationAction.UpdateMenuCurrentUrl)
  async updateMenuPevUrl(ctx: StateContext<NavigationStateModel>, action: MenuNavigationAction.UpdateMenuCurrentUrl) {
    const state = ctx.getState();

    const updatedItems = state.items.map(item => {
      if (item.key === action.key) {
        return { ...item, currentPath: action.url };
      }
      return item;
    });


    ctx.setState({
      ...state,
      items: updatedItems
    });
  }

  @Action(MenuNavigationAction.SelectMenu)
  async selectMenu(ctx: StateContext<NavigationStateModel>, action: MenuNavigationAction.SelectMenu) {

    const state = ctx.getState();

    if (state.current?.key === action.item.key) {
      return;
    }

    const actionItem = state.items.find(x => x.key === action.item.key);

    if(actionItem != undefined)
    {
      const updatedItems = state.items.map(item => {

        if (state.current && item.key === state.current.key) {
          return { ...item, isSelected: false };
        }

        if (item.key === action.item.key) {
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
