import { Routes } from '@angular/router';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { ChatUserListComponent } from './shared/components/chat-user-list/chat-user-list.component';
import { ProfileComponent } from './shared/components/profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        component: HomelayoutComponent,
        children: [{
            path: 'chatList',
            component: ChatUserListComponent
        },
        {
            path: 'profile',
            component: ProfileComponent
        }]
    },
];
