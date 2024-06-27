import { Routes } from '@angular/router';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { ChatUserListComponent } from './shared/components/chat-user-list/chat-user-list.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { ChatUIComponent } from './shared/components/chat-ui/chat-ui.component';
import { UserListAndchatUiComponent } from './component/user-list-andchat-ui/user-list-andchat-ui.component';
import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { WelcomeLayoutComponent } from './layout/welcome-layout/welcome-layout.component';


export const routes: Routes = [
    { path: '', redirectTo: '/welcome/signInAccount', pathMatch: 'full' },
    { path: 'welcome', redirectTo: '/welcome/signInAccount', pathMatch: 'full' },
    {
        path: 'home',
        component: HomelayoutComponent,
        
        data: 
        {
            path: 'home'
        },
        children: 
        [
            {
                path: 'chatList/:roomId',
                component: UserListAndchatUiComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    },{
        path: 'welcome',
        component: WelcomeLayoutComponent,
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
