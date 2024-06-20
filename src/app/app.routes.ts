import { Routes } from '@angular/router';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { ChatUserListComponent } from './shared/components/chat-user-list/chat-user-list.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { ChatUIComponent } from './shared/components/chat-ui/chat-ui.component';
import { UserListAndchatUiComponent } from './component/user-list-andchat-ui/user-list-andchat-ui.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home/chatList', pathMatch: 'full' },
    {
        path: 'home',
        component: HomelayoutComponent,
        children: 
        [
            {
                path: 'chatList',
                component: UserListAndchatUiComponent,
                data: 
                {
                    path: 'home/chatList'
                }
            },
            {
                path: 'profile',
                data: {
                    path: 'home/profile'
                },
                component: ProfileComponent
            }, 
            {
                path: 'chat',
                data: {
                    path: 'home/chat'
                },
                component: ChatUIComponent
            },{
                path: 'chatFriends',
                data: {
                    path: 'home/chatFriends'
                },
                component: ChatUserListComponent
            }
        ]
    },
];
