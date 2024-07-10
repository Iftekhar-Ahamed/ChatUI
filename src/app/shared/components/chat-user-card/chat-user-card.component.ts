import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ChatListAction } from '../../../store';
import { User } from '../../models/user.model';
import { RoomsAction } from '../../../store/rooms/rooms.action';
import { RoomSate } from '../../../store/rooms/rooms.state';
import { Observable, map, takeWhile, tap } from 'rxjs';
import { Room } from '../../models/message.model';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat-user-card',
  standalone: true,
  imports: [NgClass, AsyncPipe, NgIf,RouterModule],
  templateUrl: './chat-user-card.component.html',
  styleUrl: './chat-user-card.component.css'
})

export class ChatUserCardComponent implements OnInit {

  @Input() user!: User;
  lastMessage : string = "";
  isAlive: boolean = true;
  route :string ='';

  constructor(private store: Store,private router:Router,private activeRouter:ActivatedRoute) {
    
  }

  get avatar(): string {
    return `assets/${this.user.avatar}`;
  }

  onSelect(): void {
    this.router.navigate([this.user.id], { relativeTo: this.activeRouter });
    this.store.dispatch(new ChatListAction.SelectUser(this.user.id));
  }

  ngOnInit() {

    if(this.user)
    {

      this.store.select(RoomSate.getRoomById)
        .pipe(
          takeWhile(() => this.isAlive),
          map(filterFn => filterFn(this.user.id)),
          tap((x: Room | null) => {
            if(x)
            {
              this.lastMessage = x.lastMessage;
            }
          })
        ).subscribe();

    }
  }

  ngDistroy() 
  {
    this.isAlive = false;
  }

}
