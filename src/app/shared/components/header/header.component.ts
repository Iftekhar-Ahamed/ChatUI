import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable} from 'rxjs';
import { MenuConfigModel } from '../../models/menu-config.model';
import { Router, RouterModule} from '@angular/router';
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

  resolveUrl(menu : MenuConfigModel):string
  {
    return this.menuService.resolveMenuUrl(menu);
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
