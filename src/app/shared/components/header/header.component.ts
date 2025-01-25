import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable} from 'rxjs';
import { MenuConfigModel } from '../../models/menu-config.model';
import { RouterModule} from '@angular/router';
import { UserInfoState } from "../../../store/user-info/user-info.state";
import { UserInfoModel } from "../../models/user.model";
import { NameElementDto } from "../../models/user-info/user-info-response.model";
import { MenuNavigationState } from "../../../store/menu-navigation/menu-navigation.state";
import {MenuService} from "../../../services/menu.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent
{

  itemLinks$: Observable<MenuConfigModel[]> = this.store.select(MenuNavigationState.getMenuList);
  userInfo$: Observable<UserInfoModel | null> = this.store.select(UserInfoState.getUserInfo);


  constructor(private store: Store,private menuService:MenuService)
  {
  }

  resolveUrl(menu: MenuConfigModel): { path: string; queryParams: any } {
    const menuUrl = this.menuService.resolveMenuUrl(menu);

    const [path, queryString] = menuUrl.split('?');
    const queryParams = this.parseQueryString(queryString);

    return { path, queryParams };
  }

  parseQueryString(queryString: string | undefined): any {
    if (!queryString) return {};
    return queryString
        .split('&')
        .reduce((params: any, pair) => {
          const [key, value] = pair.split('=');
          params[key] = decodeURIComponent(value || '');
          return params;
        }, {});
  }

  trackFn(index :number,item: MenuConfigModel): string
  {
    return `${index}${item.key}${item.isSelected}`;
  }

  userFullName(nameElement:NameElementDto): string
  {

    return  `${nameElement.firstName} ${nameElement.middleName}  ${nameElement.lastName}`;

  }
}
