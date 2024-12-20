import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.model';
import { CommonModule } from '@angular/common';
import { Select } from '@ngxs/store';
import { Observable, takeWhile, tap } from 'rxjs';
import {UserInfoState} from "../../../store/user-info/user-info.state";
import {UserInfoModel} from "../../models/user.model";

@Component({
  selector: 'app-message-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.css'
})
export class MessageCardComponent {

  @Input() msg!: Message;
  @Select(UserInfoState.getUserInfo) user$!: Observable<UserInfoModel>;
  isAlive: boolean = true;

  loggedInUser: string = "";
  constructor() {
    this.user$.pipe(
      takeWhile(() => this.isAlive),
      tap((x: UserInfoModel) => {
        this.loggedInUser = x.email;
      })
    ).subscribe();
  }
  ngDistroy()
  {
    this.isAlive = false;
  }
}
