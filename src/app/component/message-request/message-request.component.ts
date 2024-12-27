import { Component } from '@angular/core';
import {ListViewComponent} from "../../shared/components/list-view/list-view.component";

@Component({
  selector: 'app-message-request',
  standalone: true,
  imports: [
    ListViewComponent
  ],
  templateUrl: './message-request.component.html',
  styleUrl: './message-request.component.css'
})
export class MessageRequestComponent
{

}
