import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserAction } from '../../../store';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-chat-user-card',
  standalone: true,
  imports: [NgClass, AsyncPipe, NgIf],
  templateUrl: './chat-user-card.component.html',
  styleUrl: './chat-user-card.component.css'
})

export class ChatUserCardComponent {

  @Input() user!: User;

  constructor(private store: Store) {
  }

  get avatar(): string {
    return `assets/${this.user.avatar}`;
  }
  onSelect(): void {
    this.store.dispatch(new UserAction.SelectUser(this.user));
  }
}
