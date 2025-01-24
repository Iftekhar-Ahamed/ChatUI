import {Component} from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {ProfileComponent} from "../../shared/components/profile/profile.component";

@Component({
    selector: 'app-profile-layout',
    standalone: true,
    imports: [
        HeaderComponent,
        ProfileComponent
    ],
    templateUrl: './profile-layout.component.html',
    styleUrl: './profile-layout.component.css'
})
export class ProfileLayoutComponent {
}
