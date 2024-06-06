import { Component } from '@angular/core';
import { ChatUserCardComponent } from '../chat-user-card/chat-user-card.component';
import { UserState } from '../../../store';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat-user-list',
  standalone: true,
  imports: [ChatUserCardComponent, AsyncPipe],
  templateUrl: './chat-user-list.component.html',
  styleUrl: './chat-user-list.component.css'
})
export class ChatUserListComponent {
  @Select(UserState.users) users$!: Observable<User[]>;
  constructor() {

  }
}
