import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ChatUI';
  constructor(@Inject(PLATFORM_ID) private platformId: object) {

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
      initFlowbite();
  }
}
