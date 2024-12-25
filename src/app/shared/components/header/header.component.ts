import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
  Select,
  Store
} from '@ngxs/store';
import { itemLinkState } from '../../../store/itemLink/item-link.state';
import { Observable} from 'rxjs';
import { ItemLinkModel } from '../../models/itemLink.model';
import { ItemLinkAction } from '../../../store/itemLink/item-link.action';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import {UserInfoState} from "../../../store/user-info/user-info.state";
import {UserInfoModel} from "../../models/user.model";
import {NameElementDto} from "../../models/user-info/user-info-response.model";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Select(itemLinkState.itemList) itemLinks$!: Observable<ItemLinkModel[]>;
  @Select(UserInfoState.getUserInfo) user$!: Observable<UserInfoModel>;


  constructor(private store: Store,private router: Router) {}

  ngOnInit()
  {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setSelectedMenu(event.urlAfterRedirects);
      }
    });
  }

  setSelectedMenu(url: string): void {

    console.log(url);
    this.store.dispatch(new ItemLinkAction.SelectItemLink(url));
  }

  trackFn(index :number,item: ItemLinkModel): string {
    return `${index}${item.key}${item.isSelected}`;
  }

  userFullName(nameElement:NameElementDto): string {

    return  `${nameElement.firstName} ${nameElement.middleName}  ${nameElement.lastName}`;

  }
}
