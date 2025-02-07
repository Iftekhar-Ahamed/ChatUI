import { Component } from '@angular/core';
import {MessageRequestComponent} from "../../component/message-request/message-request.component";

@Component({
  selector: 'app-message-request-layout',
  standalone: true,
  imports: [
    MessageRequestComponent
  ],
  templateUrl: './message-request-layout.component.html',
  styleUrl: './message-request-layout.component.css'
})
export class MessageRequestLayoutComponent {

}
