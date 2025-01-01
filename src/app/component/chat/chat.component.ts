import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StartNewChatCardComponent } from '../../shared/components/start-new-chat-card/start-new-chat-card.component';
import {ListViewComponent} from "../../shared/components/list-view/list-view.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, StartNewChatCardComponent, RouterModule, ListViewComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
