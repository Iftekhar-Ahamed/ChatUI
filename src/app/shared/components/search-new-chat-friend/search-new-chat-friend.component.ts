import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ItemLinkAction } from '../../../store/itemLink/itemLink.action';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchResultComponent } from '../search-result/search-result.component';
import { CommonModule } from '@angular/common';

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
    this.store.dispatch(new ItemLinkAction.UpdateUrl("home/chatList",this.route.url));
  }
}
