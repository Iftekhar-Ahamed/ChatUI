import { Component } from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {HomeComponent} from "../../component/home/home.component";

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    HomeComponent
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {

}
