import { Component } from '@angular/core';
import { AfterViewChecked, AfterViewInit, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, map, takeWhile, tap } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MessageCardComponent } from '../../shared/components/message-card/message-card.component';
import { MessageInputComponent } from '../../shared/components/message-input/message-input.component';
import { Room } from '../../shared/models/message.model';
import { ChatListAction } from '../../store';
import { ItemLinkAction } from '../../store/itemLink/itemLink.action';
import { RoomSate } from '../../store/rooms/rooms.state';
type Position = 'start' | 'mid' | 'end';


@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [MessageCardComponent, MessageInputComponent, CommonModule,ScrollingModule ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent implements OnInit,AfterViewChecked
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

            this.store.dispatch(new ChatListAction.SelectUser(this.roomId));
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
