import { AsyncPipe, CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LogedInUser, User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { UserState } from '../../../store';

@Component({
  selector: 'app-chat-user-card',
  standalone: true,
  imports: [NgClass, AsyncPipe, NgIf],
  templateUrl: './chat-user-card.component.html',
  styleUrl: './chat-user-card.component.css'
})

export class ChatUserCardComponent {

  @Input() user!: User;

  constructor() {
  }

  get avater(): string {
    return `assets/${this.user.avatar}`;
  }
}
