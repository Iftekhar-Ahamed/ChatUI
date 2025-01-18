import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { NgClass, NgIf } from '@angular/common';
import { ChatListState } from '../../../store';
import { Observable, take} from 'rxjs';
import { StartNewChatProperty } from '../../models/chatList.model';

@Component({
  selector: 'app-start-new-chat-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './start-new-chat-card.component.html',
  styleUrl: './start-new-chat-card.component.css'
})
export class StartNewChatCardComponent implements OnInit{
  newChat : StartNewChatProperty;
  newChat$ : Observable<StartNewChatProperty> = this.store.select(ChatListState.newChat);

  constructor(private store: Store,private router:Router,private activeRouter:ActivatedRoute) {
    this.newChat = { isSelected : false};
  }

  onSelect(): void
  {
    this.router.navigate(["search"], {relativeTo: this.activeRouter}).then(r => console.log(r));
  }

  ngOnInit()
  {
    this.newChat$
      .pipe(
        take(1)
      )
      .subscribe((newChat: StartNewChatProperty) => {
        this.newChat = newChat;
      });
  }
}
