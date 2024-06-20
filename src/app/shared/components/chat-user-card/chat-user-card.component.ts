import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UserAction } from '../../../store';
import { User } from '../../models/user.model';
import { RoomsAction } from '../../../store/rooms/rooms.action';
import { RoomSate } from '../../../store/rooms/rooms.state';
import { Observable, map, takeWhile, tap } from 'rxjs';
import { Room } from '../../models/message.model';

@Component({
  selector: 'app-chat-user-card',
  standalone: true,
  imports: [NgClass, AsyncPipe, NgIf],
  templateUrl: './chat-user-card.component.html',
  styleUrl: './chat-user-card.component.css'
})

export class ChatUserCardComponent implements OnInit {

  @Input() user!: User;
  lastMessage : string = "";
  isAlive: boolean = true;

  constructor(private store: Store) {
    
  }

  get avatar(): string {
    return `assets/${this.user.avatar}`;
  }

  onSelect(): void {
    this.store.dispatch(new UserAction.SelectUser(this.user));
    this.store.dispatch(new RoomsAction.SelectRoom(this.user.id));
  }

  ngOnInit() {

    if(this.user)
    {
      if(this.user.isSelected)
      {
        this.onSelect();
      }

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
