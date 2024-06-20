import { Component } from '@angular/core';
import { ChatUserListComponent } from '../../shared/components/chat-user-list/chat-user-list.component';
import { ChatUIComponent } from '../../shared/components/chat-ui/chat-ui.component';

@Component({
  selector: 'app-user-list-andchat-ui',
  standalone: true,
  imports: [ChatUserListComponent,ChatUIComponent],
  templateUrl: './user-list-andchat-ui.component.html',
  styleUrl: './user-list-andchat-ui.component.css'
})
export class UserListAndchatUiComponent {

}
