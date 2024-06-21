import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RoomsAction } from '../../../store/rooms/rooms.action';
import { Message } from '../../models/message.model';
import { CommonModule } from '@angular/common';
import { cloneDeep } from 'lodash';
import { FormsModule } from '@angular/forms';
import { LogedInUserState } from '../../../store/logedInUser/logedInUser.state';
import { LogedInUser, User } from '../../models/user.model';
import { Observable, map, takeUntil, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent 
{
  @Select(LogedInUserState.userNameOrEmail) user$!: Observable<string>;
  @Input() roomId!:string;
  isAlive: boolean = true;
  
  msg: Message = 
  {
    author: "",
    message: "",
    messageDateTime: new Date(),
    id: ""
  }

  constructor(private store: Store) 
  {
      this.user$.pipe(
        takeWhile(() => this.isAlive),
        tap((x: string) => {
          this.msg.author = x;
        })
      ).subscribe();
  }

  send() 
  {
    if (this.msg.message && this.msg.message.trim()){
      this.msg.messageDateTime = new Date();
      let tmp = cloneDeep(this.msg);
      this.store.dispatch(new RoomsAction.AddMessageRoomById(this.roomId, tmp));
      this.msg.message = "";
    }
  }

  ngDistroy() 
  {
    this.isAlive = false;
  }

}
