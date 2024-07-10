import { Component } from '@angular/core';
import { ChatUserListComponent } from '../../shared/components/chat-user-list/chat-user-list.component';
import { ChatUIComponent } from '../../shared/components/chat-ui/chat-ui.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, tap,map, takeWhile } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchUserComponent } from '../../shared/components/search-user/search-user.component';

@Component({
  selector: 'app-user-list-andchat-ui',
  standalone: true,
  imports: [ChatUserListComponent,ChatUIComponent,CommonModule,SearchUserComponent,RouterModule],
  templateUrl: './user-list-andchat-ui.component.html',
  styleUrl: './user-list-andchat-ui.component.css'
})

export class UserListAndchatUiComponent 
{
  constructor()
  {
  }
  
  ngDistroy() 
  {
  }
}
