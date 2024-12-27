import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Store} from "@ngxs/store";
import {UserActions} from "../../../store/user-actions/user-actions.action";
import {lastValueFrom, map, Observable, take} from "rxjs";
import {UserActionsState} from "../../../store/user-actions/user-actions.state";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBarComponent
{

  searchKey$: Observable<string> = this.store.select(UserActionsState.searchKey);
  searchKey : string = "";

  constructor(private store:Store)
  {
    this.searchKey$.pipe(
      take(1),
      map( keyword => this.searchKey = keyword),
    ).subscribe();
  }

  async onSearch(): Promise<void>
  {
    if (this.searchKey.trim())
    {
      await lastValueFrom(this.store.dispatch(new UserActions.searchUserAsync(this.searchKey)));
      console.log(this.searchKey);
    }
  }
}
