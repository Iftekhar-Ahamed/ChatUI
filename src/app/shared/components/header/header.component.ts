import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { itemLinkState } from '../../../store/itemLink/itemLink.state';
import { Observable } from 'rxjs';
import { ItemLinkModel } from '../../models/itemLink.model';
import { ItemLinkAction } from '../../../store/itemLink/itemLink.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isSelected: boolean = true;
  @Select(itemLinkState.itemList) itemLinks$!: Observable<ItemLinkModel[]>;
  constructor(private store: Store) { }
  trackfn(index: number, item: ItemLinkModel): string {
    return `${item.id}${item.isSelected}${Math.random()}`;
  }
  onSelect(item: ItemLinkModel): void {
    this.store.dispatch(new ItemLinkAction.SelectItemLink(item));
  }
}
