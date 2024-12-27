import { Injectable } from '@angular/core';
import {combineLatest, filter, Observable, Subject, take, takeUntil} from "rxjs";
import {MenuConfigModel} from "../shared/models/menu-config.model";
import {MenuNavigationState} from "../store/menu-navigation/menu-navigation.state";
import {UserInfoModel} from "../shared/models/user.model";
import {UserInfoState} from "../store/user-info/user-info.state";
import {Store} from "@ngxs/store";
import {NavigationEnd, Router} from "@angular/router";
import {MenuNavigationAction} from "../store/menu-navigation/menu-navigation.action";

@Injectable({
  providedIn: 'root'
})
export class MenuService
{
  itemLinks$: Observable<MenuConfigModel[]> = this.store.select(MenuNavigationState.getMenuList);
  userInfo$: Observable<UserInfoModel | null> = this.store.select(UserInfoState.getUserInfo);

  private destroy$ = new Subject<void>();

  constructor(private store: Store,private router: Router)
  {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateSelectedMenuItem();
      });
  }


  private updateSelectedMenuItem(): void
  {
    console.log(this.router.url);

    combineLatest([this.itemLinks$, this.userInfo$])
      .pipe(take(1))
      .subscribe(([itemLinks, userInfo]) => {
        const currentUrl = this.router.url;

        // Find the item link that matches the current URL
        const selectedItem = itemLinks.find(item => currentUrl.includes(item.key));

        if (selectedItem) {
          // Dispatch the action to update the selected item in the store
          this.store.dispatch(new MenuNavigationAction.SelectMenu(selectedItem));
          this.store.dispatch(new MenuNavigationAction.UpdateMenuCurrentUrl(selectedItem.key, currentUrl));
        } else {
          console.warn('No menu item matches the current URL:', currentUrl);
        }
      });
  }

  public resolveMenuUrl(menu : MenuConfigModel):string
  {
    let currentRoute = this.router.url;

    if(currentRoute.includes(menu.key))
    {
      return menu.basePath;
    }

    return menu.currentPath ?? menu.basePath;
  }
}
