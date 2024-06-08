import { Component } from '@angular/core';
import { ChatUserCardComponent } from '../chat-user-card/chat-user-card.component';
import { ChatListState } from '../../../store';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChatListModel } from '../../models/chatList.model';

@Component({
  selector: 'app-chat-user-list',
  standalone: true,
  imports: [CommonModule, ChatUserCardComponent, AsyncPipe],
  templateUrl: './chat-user-list.component.html',
  styleUrl: './chat-user-list.component.css'
})
export class ChatUserListComponent {
  @Select(ChatListState.chatLists) chatList$!: Observable<ChatListModel>;
  constructor() {

  }

  trackfn(index: number, user: User): string {
    return `${user.id}${user.isSelected}${Math.random()}`;
  }

}
