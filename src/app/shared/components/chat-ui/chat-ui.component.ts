import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ItemLinkAction } from '../../../store/itemLink/itemLink.action';
import { RoomSate } from '../../../store/rooms/rooms.state';
import { Observable, map, takeUntil, takeWhile, tap } from 'rxjs';
import { Room } from '../../models/message.model';
import { MessageCardComponent } from '../message-card/message-card.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-ui',
  standalone: true,
  imports: [CdkVirtualScrollViewport, MessageCardComponent, MessageInputComponent, ScrollingModule, CommonModule],
  templateUrl: './chat-ui.component.html',
  styleUrl: './chat-ui.component.css'
})
export class ChatUIComponent {

  room$: Observable<Room | null>;
  isAlive: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {

    const data = this.route.snapshot.data;
    store.dispatch(new ItemLinkAction.SelectItemLink(data['path']));

    this.room$ = this.store.select(RoomSate.roomById)
      .pipe(
        takeWhile(() => this.isAlive),
        map(filterFn => filterFn("1")),
        tap((x: Room | null) => {
          console.log(x);
          return x;
        })
      );
  }

  ngDistroy() {
    this.isAlive = false;
  }

}
