import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { itemLinkState } from '../../../store/itemLink/itemLink.state';
import { Observable } from 'rxjs';
import { ItemLinkModel } from '../../models/itemLink.model';
import { ItemLinkAction } from '../../../store/itemLink/itemLink.action';
import { RouterModule } from '@angular/router';
import { LogedInUserState } from '../../../store/logedInUser/logedInUser.state';
import { LogedInUser } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  @Select(itemLinkState.itemList) itemLinks$!: Observable<ItemLinkModel[]>;
  @Select(LogedInUserState.user) user$!: Observable<LogedInUser>;

  constructor(private store: Store) { }
  
  trackfn(index: number, item: ItemLinkModel): string {
    return `${item.key}${item.isSelected}`;
  }
  select(){
    console.log('[routerLink]="item.url"');
  }
}
