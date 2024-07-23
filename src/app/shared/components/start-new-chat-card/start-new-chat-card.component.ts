import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { NgClass, AsyncPipe, NgIf } from '@angular/common';
import { ChatListAction, ChatListState } from '../../../store';
import { map, Observable, takeWhile, tap } from 'rxjs';
import { StartNewChatProperty } from '../../models/chatList.model';

@Component({
  selector: 'app-start-new-chat-card',
  standalone: true,
  imports: [NgClass, AsyncPipe, NgIf,RouterModule],
  templateUrl: './start-new-chat-card.component.html',
  styleUrl: './start-new-chat-card.component.css'
})
export class StartNewChatCardComponent implements OnInit{
  isAlive: boolean = true;
  newChat : StartNewChatProperty;
  @Select(ChatListState.newChat) newChat$! : Observable<StartNewChatProperty>;

  constructor(private store: Store,private router:Router,private activeRouter:ActivatedRoute) {
    this.newChat = { isSelected : false};
  }

  onSelect(): void 
  {
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
