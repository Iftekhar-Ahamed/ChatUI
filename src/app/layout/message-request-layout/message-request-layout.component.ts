import { Component } from '@angular/core';
import {MessageRequestComponent} from "../../component/message-request/message-request.component";
import {HeaderComponent} from "../../shared/components/header/header.component";

@Component({
  selector: 'app-message-request-layout',
  standalone: true,
  imports: [
    MessageRequestComponent,
    HeaderComponent
  ],
  templateUrl: './message-request-layout.component.html',
  styleUrl: './message-request-layout.component.css'
})
export class MessageRequestLayoutComponent {

}
