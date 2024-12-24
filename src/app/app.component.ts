import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import {NgxSpinnerModule} from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'ChatUI';
  constructor() {}

}
