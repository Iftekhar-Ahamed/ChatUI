import { Routes } from '@angular/router';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { ChatUserListComponent } from './shared/components/chat-user-list/chat-user-list.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { ChatUIComponent } from './shared/components/chat-ui/chat-ui.component';
import { TestComponent } from './shared/components/test/test.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        component: HomelayoutComponent,
        children: [{
            path: 'chatList',
            data: {
                path: 'home/chatList'
            },
            component: ChatUserListComponent
        },
        {
            path: 'profile',
            data: {
                path: 'home/profile'
            },
            component: ProfileComponent
        }, {
            path: 'chat',
            data: {
                path: 'home/chat'
            },
            component: ChatUIComponent
        }, {
            path: 'test',
            data: {
                path: 'home/test'
            },
            component: TestComponent
        }]
    },
];
