import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxSpinnerModule} from "ngx-spinner";
import {MenuService} from "./services/menu.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'ChatUI';
  constructor(private menuService: MenuService) {}

}
