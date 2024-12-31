import { Component } from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {RouterOutlet} from "@angular/router";
import {ChatComponent} from "../../component/chat/chat.component";

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    ChatComponent
  ],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css'
})
export class ChatLayoutComponent {

}
