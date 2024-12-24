import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RoomsAction } from '../../../store/rooms/rooms.action';
import { Message } from '../../models/message.model';
import { cloneDeep } from 'lodash';
import { FormsModule } from '@angular/forms';
import { Observable, takeWhile, tap } from 'rxjs';
import {UserInfoState} from "../../../store/user-info/user-info.state";
import {UserInfoModel} from "../../models/user.model";

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent
{
  @Select(UserInfoState.getUserInfo) user$!: Observable<UserInfoModel>;
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
        tap((x: UserInfoModel) => {
          this.msg.author = x.email;
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
