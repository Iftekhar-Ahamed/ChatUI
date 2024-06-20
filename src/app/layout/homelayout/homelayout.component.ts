import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ChatUserListComponent } from '../../shared/components/chat-user-list/chat-user-list.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { Select, Store } from '@ngxs/store';
import { ItemLinkAction } from '../../store/itemLink/itemLink.action';

@Component
(
  {
    selector: 'app-homelayout',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, ChatUserListComponent, NavigationComponent],
    templateUrl: './homelayout.component.html',
    styleUrl: './homelayout.component.css'
  }
)
export class HomelayoutComponent 
{
  constructor(
    private route: ActivatedRoute,
    private store: Store
  )
  {
    const data = this.route.snapshot.data;
    store.dispatch(new ItemLinkAction.SelectItemLink(data['path']))
  }
}
