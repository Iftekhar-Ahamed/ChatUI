import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Store} from "@ngxs/store";
import {UserActions} from "../../../store/user-actions/user-actions.action";
import {lastValueFrom} from "rxjs";

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

  searchKey: string = '';

  constructor(private store:Store) {
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
