import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { NgClass, AsyncPipe, NgIf } from '@angular/common';
import { ChatListAction, ChatListState } from '../../../store';
import { map, Observable, takeWhile, tap } from 'rxjs';
import { StartNewChatProperty } from '../../models/chatList.model';

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [NgClass, AsyncPipe, NgIf,RouterModule],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent implements OnInit{
  isAlive: boolean = true;
  newChat : StartNewChatProperty;
  @Select(ChatListState.newChat) newChat$! : Observable<StartNewChatProperty>;

  constructor(private store: Store,private router:Router,private activeRouter:ActivatedRoute) {
  }

  onSelect(): void 
  {
    this.store.dispatch( new ChatListAction.SelectNewChat());
    this.router.navigate(["search"], { relativeTo: this.activeRouter });
  }
  ngOnInit(){
    this.newChat$
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe((newChat: StartNewChatProperty) => {
        this.newChat = newChat;
      });
  }

  ngDistroy() 
  {
    console.log("Called");
    this.isAlive = false;
  }
}
