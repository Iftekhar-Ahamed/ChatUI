import {Component, Input, OnInit} from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FriendshipStatus } from '../../enums/user.enum';
import { SearchResultModel } from "../../models/search-result/search-result.model";

@Component({
  selector: 'app-search-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-user-card.component.html',
  styleUrl: './search-user-card.component.css'
})
export class SearchUserCardComponent{

  @Input() user!: SearchResultModel;

  constructor(private store: Store, private router: Router, private activeRouter: ActivatedRoute)
  {
  }

  get avatar(): string
  {
    return `assets/avatar.jpg`;
  }

  sendFriendRequest(): void
  {
    console.log(this.user);
  }

  onSelect(): void
  {
    //this.router.navigate([this.user.id], { relativeTo: this.activeRouter });
  }

  protected readonly FriendshipStatus = FriendshipStatus;
}
