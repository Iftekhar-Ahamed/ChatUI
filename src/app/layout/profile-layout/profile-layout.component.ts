import { Component } from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {MessageRequestComponent} from "../../component/message-request/message-request.component";
import {ProfileComponent} from "../../shared/components/profile/profile.component";

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    MessageRequestComponent,
    ProfileComponent
  ],
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.css'
})
export class ProfileLayoutComponent {

}
