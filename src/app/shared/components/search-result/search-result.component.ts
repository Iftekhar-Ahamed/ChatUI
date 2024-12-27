import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchUserCardComponent } from '../search-user-card/search-user-card.component';
import { Store } from '@ngxs/store';
import { UserActionsState } from '../../../store/user-actions/user-actions.state';
import { Observable } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {SearchResultModel} from "../../models/search-result/search-result.model";

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule,SearchUserCardComponent,ScrollingModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  searchResult$:Observable<SearchResultModel[]> = this.store.select(UserActionsState.searchedResult);

  constructor(
    private store : Store
  )
  {

  }

  trackfn(index: number, result: SearchResultModel): string {
    return `${result.id}${result.isSelected}${Math.random()}`;
  }
}
