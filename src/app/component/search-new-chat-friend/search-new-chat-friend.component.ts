import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SearchResultComponent } from '../../shared/components/search-result/search-result.component';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { ChatListAction } from '../../store';
import { MenuNavigationAction } from '../../store/menu-navigation/menu-navigation.action';

@Component({
  selector: 'app-search-new-chat-friend',
  standalone: true,
  imports: [SearchBarComponent,SearchResultComponent,CommonModule],
  templateUrl: './search-new-chat-friend.component.html',
  styleUrl: './search-new-chat-friend.component.css'
})
export class SearchNewChatFriendComponent implements OnInit {
  constructor(private route:Router,private store:Store){

  }
  ngOnInit(): void {
    this.store.dispatch( new ChatListAction.SelectNewChat());
    this.store.dispatch(new MenuNavigationAction.UpdateMenuCurrentUrl("home/chatList",this.route.url));
  }
}
