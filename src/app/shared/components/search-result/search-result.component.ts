import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchUserCardComponent } from '../search-user-card/search-user-card.component';
import { Select, Store } from '@ngxs/store';
import { UserActionState } from '../../../store/UserActions/userAction.state';
import { Observable } from 'rxjs';
import { SearchedUserResult } from '../../models/userAction.model';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule,SearchUserCardComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  @Select(UserActionState.searchedResult) searchResult$!:Observable<SearchedUserResult[]>;

  constructor(
    private store : Store
  ){

  }

  trackfn(index: number, result: SearchedUserResult): string {
    return `${result.id}${result.isSelected}${Math.random()}`;
  }
}
