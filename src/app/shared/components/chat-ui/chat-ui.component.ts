import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ItemLinkAction } from '../../../store/itemLink/itemLink.action';
import { RoomSate } from '../../../store/rooms/rooms.state';
import { Observable, Subscription, map, takeUntil, takeWhile, tap } from 'rxjs';
import { Room } from '../../models/message.model';
import { MessageCardComponent } from '../message-card/message-card.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ChatListAction } from '../../../store';

type Position = 'start' | 'mid' | 'end';

@Component
(
  {
    selector: 'app-chat-ui',
    standalone: true,
    imports: [ MessageCardComponent, MessageInputComponent, CommonModule,ScrollingModule ],
    templateUrl: './chat-ui.component.html',
    styleUrl: './chat-ui.component.css',
    providers: [],
  }
)

export class ChatUIComponent implements OnInit,AfterViewChecked
{
  
  @ViewChild('scrollframe') private scrollFrame!: ElementRef;
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  room$: Observable<Room | null>;
  room : Room;
  isAlive: boolean = true;
  roomId: string;

  constructor(
    private store: Store,
    private router: Router,
    private renderer:Renderer2,
    private route:ActivatedRoute
  ) 
  {
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId')??"";
      this.loadRoom();
    });
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
            this.triggerAnimation();
            this.store.dispatch(new ItemLinkAction.UpdateUrl("home/chatList",this.router.url));
            if(x) this.room = x;
            return x;
          }
        )
      );
  }

  triggerAnimation() {

    if(this.chatContainer != undefined){
      this.renderer.addClass(this.chatContainer.nativeElement, 'fadeIn-Animation');
      setTimeout(() => {
        this.renderer.removeClass(this.chatContainer.nativeElement, 'fadeIn-Animation');
      }, 500);
    }
    
  }

  scroll(position: Position) {
    let scrollIndex: number;
    switch (position) {
      case 'start':
        scrollIndex = 0;
        break;
      case 'mid':
        scrollIndex = this.room.messages.length / 2;
        break;
      case 'end':
        scrollIndex = this.room.messages.length;
        break;
    }
    this.viewPort.scrollToIndex(scrollIndex, 'smooth');
  }

  ngAfterViewChecked(): void 
  {
    if(this.roomId != '0'){
      this.scrollFrame.nativeElement.scrollTop = this.scrollFrame.nativeElement.scrollHeight;
    }
  }
  
  ngDistroy() 
  {
    this.isAlive = false;
  }

}
