import { Routes } from '@angular/router';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { ChatUserListComponent } from './shared/components/chat-user-list/chat-user-list.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { ChatUIComponent } from './shared/components/chat-ui/chat-ui.component';
import { UserListAndchatUiComponent } from './component/user-list-andchat-ui/user-list-andchat-ui.component';
import { LogInLayoutComponent } from './layout/log-in-layout/log-in-layout.component';
import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home/chatList/0', pathMatch: 'full' },
    {
        path: 'home',
        component: HomelayoutComponent,
        children: 
        [
            {
                path: 'chatList/:roomId',
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
            }
        ]
    },{
        path: 'logIn',
        component: LogInLayoutComponent,
        children: 
        [
            {
                path: 'signInAccount',
                component: SignInComponent,
            },
            {
                path: 'signUpAccount',
                component: SignUpComponent
            }
        ]
    },
];
