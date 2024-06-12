import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ItemLinkAction } from '../../../store/itemLink/itemLink.action';
import { RoomSate } from '../../../store/rooms/rooms.state';
import { map, takeWhile, tap } from 'rxjs';
import { Room } from '../../models/message.model';
import { MessageCardComponent } from '../message-card/message-card.component';
import { MessageInputComponent } from '../message-input/message-input.component';

@Component({
  selector: 'app-chat-ui',
  standalone: true,
  imports: [MessageCardComponent, MessageInputComponent],
  templateUrl: './chat-ui.component.html',
  styleUrl: './chat-ui.component.css'
})
export class ChatUIComponent {
  room!: Room | null;
  isAlive: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    const data = this.route.snapshot.data;
    store.dispatch(new ItemLinkAction.SelectItemLink(data['path']));

    this.store.select(RoomSate.roomById)
      .pipe(
        takeWhile(() => this.isAlive),
        map(filterFn => filterFn("1")),
        tap((x: Room | null) => {
          this.room = x;
          return x;
        })
      ).subscribe();
  }

  ngDistroy() {
    this.isAlive = false;
  }

}
