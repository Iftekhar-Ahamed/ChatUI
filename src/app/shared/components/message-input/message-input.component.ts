import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { RoomsAction } from '../../../store/rooms/rooms.action';
import { Message } from '../../models/message.model';
import { CommonModule } from '@angular/common';
import { cloneDeep } from 'lodash';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent 
{
  msg: Message = 
  {
    author: "Al-Amin",
    message: "",
    messageDateTime: new Date(),
    id: "1"
  }

  constructor(private store: Store) 
  {
  }

  send() 
  {
    this.store.dispatch(new RoomsAction.SelectRoom("1"));
    this.msg.messageDateTime = new Date();
    let tmp = cloneDeep(this.msg);
    this.store.dispatch(new RoomsAction.AddMessageIntoCurrentRoom("1", tmp));
    this.msg.message = "";
  }

}
