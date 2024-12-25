import { Component } from '@angular/core';
import { ConversationComponent } from '../conversation/conversation.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatUserListComponent } from '../../shared/components/chat-user-list/chat-user-list.component';
import { StartNewChatCardComponent } from '../../shared/components/start-new-chat-card/start-new-chat-card.component';
import {ChatLayoutComponent} from "../../layout/chat-layout/chat-layout.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatUserListComponent, CommonModule, StartNewChatCardComponent, RouterModule, ChatLayoutComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
