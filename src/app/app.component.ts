import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxSpinnerModule} from "ngx-spinner";
import {MenuService} from "./services/menu.service";
import {HeaderComponent} from "./shared/components/header/header.component";
import {UserInfoState} from "./store/user-info/user-info.state";
import {Store} from "@ngxs/store";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule, HeaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn = false;
  title = 'ChatUI';

  constructor(private store: Store) {
    this.store.select(UserInfoState.isUserLogIn).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
      }
    });
  }

}
