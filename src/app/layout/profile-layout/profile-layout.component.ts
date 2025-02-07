import {Component} from '@angular/core';
import {ProfileComponent} from "../../shared/components/profile/profile.component";

@Component({
    selector: 'app-profile-layout',
    standalone: true,
    imports: [
        ProfileComponent
    ],
    templateUrl: './profile-layout.component.html',
    styleUrl: './profile-layout.component.css'
})
export class ProfileLayoutComponent {
}
