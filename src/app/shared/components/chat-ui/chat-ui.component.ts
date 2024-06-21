import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ItemLinkAction } from '../../../store/itemLink/itemLink.action';
import { RoomSate } from '../../../store/rooms/rooms.state';
import { Observable, Subscription, map, takeUntil, takeWhile, tap } from 'rxjs';
import { Room } from '../../models/message.model';
import { MessageCardComponent } from '../message-card/message-card.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from "@angular/common";
import { UserAction } from '../../../store';

@Component
(
  {
    selector: 'app-chat-ui',
    standalone: true,
    imports: [ MessageCardComponent, MessageInputComponent, CommonModule ],
    templateUrl: './chat-ui.component.html',
    styleUrl: './chat-ui.component.css',
    providers: [],
  }
)
export class ChatUIComponent implements AfterViewChecked,OnInit,OnChanges
{

  @ViewChild('scrollframe') private scrollFrame!: ElementRef;
  room$: Observable<Room | null>;
  isAlive: boolean = true;
  @Input() roomId! : string;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) 
  {
    const data = this.route.snapshot.data;
    store.dispatch(new ItemLinkAction.SelectItemLink(data['path']));
  }

  ngOnInit(){
  }

  loadRoom(){
    this.room$ = this.store.select(RoomSate.getRoomById)
      .pipe
      (
        map(getRoomById => getRoomById(this.roomId)),
        takeWhile(() => this.isAlive),
        tap
        (
          (x: Room | null) => 
          {
            if(x){
              this.store.dispatch(new UserAction.SelectUser(x.roomId));
            }
            return x;
          }
        )
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['roomId']) {
      this.loadRoom();
    }
  }
  ngAfterViewChecked(): void 
  {
    this.scrollFrame.nativeElement.scrollTop = this.scrollFrame.nativeElement.scrollHeight;
  }
  ngDistroy() 
  {
    this.isAlive = false;
  }

}
