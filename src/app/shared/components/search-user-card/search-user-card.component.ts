import { Component, Input } from '@angular/core';
import { SearchedUserResult } from '../../models/userAction.model';
import { ActionStatus, Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GlobalUserStatus } from '../../enums/user.enum';

@Component({
  selector: 'app-search-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-user-card.component.html',
  styleUrl: './search-user-card.component.css'
})
export class SearchUserCardComponent {

  @Input() user!: SearchedUserResult;
  actionName: string = "Default";
  actionType: number = 0;

  constructor(private store: Store, private router: Router, private activeRouter: ActivatedRoute) {
  }

  get avatar(): string {
    return `assets/${this.user.avatar}`;
  }
  sendFriendRequest(): void {

  }

  onSelect(): void {
    //this.router.navigate([this.user.id], { relativeTo: this.activeRouter });
  }

  ngOnInit() {
    this.actionType = this.user.actionStatus;

    if (this.user.actionStatus == GlobalUserStatus.Connected) {
      this.actionName = "Remove";
    }
    else if (this.user.actionStatus == GlobalUserStatus.NotConnected) {
      this.actionName = "Send Request";
    }
    else if (this.user.actionStatus == GlobalUserStatus.Requested) {
      this.actionName = "Cancel Request";
    }
  }

  ngDistroy() {
  }
}
