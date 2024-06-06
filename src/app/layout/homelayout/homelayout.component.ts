import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { ChatUserListComponent } from '../../shared/chat-user-list/chat-user-list.component';
import { NavigationComponent } from '../../shared/navigation/navigation.component';

@Component({
  selector: 'app-homelayout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ChatUserListComponent, NavigationComponent],
  templateUrl: './homelayout.component.html',
  styleUrl: './homelayout.component.css'
})
export class HomelayoutComponent {

}
