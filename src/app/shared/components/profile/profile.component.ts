import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ItemLinkAction } from '../../../store/itemLink/itemLink.action';
import { LogedInUserState } from '../../../store/logedInUser/logedInUser.state';
import { LogedInUser } from '../../models/user.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
  @Select(LogedInUserState.user) user$!: Observable<LogedInUser>;

  constructor(
    private store : Store
  ) {

  }
}
