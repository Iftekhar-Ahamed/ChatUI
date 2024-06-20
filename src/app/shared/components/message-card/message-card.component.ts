import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.model';
import { CommonModule } from '@angular/common';
import { Select } from '@ngxs/store';
import { Observable, takeWhile, tap } from 'rxjs';
import { LogedInUserState } from '../../../store/logedInUser/logedInUser.state';

@Component({
  selector: 'app-message-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.css'
})
export class MessageCardComponent {

  @Input() msg!: Message;
  @Select(LogedInUserState.userNameOrEmail) user$!: Observable<string>;
  isAlive: boolean = true;

  loggedInUser: string = "";
  constructor() {
    this.user$.pipe(
      takeWhile(() => this.isAlive),
      tap((x: string) => {
        this.loggedInUser = x;
      })
    ).subscribe();
  }
  ngDistroy() 
  {
    this.isAlive = false;
  }
}
