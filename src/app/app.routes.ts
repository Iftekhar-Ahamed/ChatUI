import { Routes } from '@angular/router';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { UserListAndchatUiComponent } from './component/user-list-andchat-ui/user-list-andchat-ui.component';
import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { WelcomeLayoutComponent } from './layout/welcome-layout/welcome-layout.component';
import { SearchUserComponent } from './shared/components/search-user/search-user.component';
import { Component } from '@angular/core';
import { ChatUIComponent } from './shared/components/chat-ui/chat-ui.component';
import { SearchNewChatFriendComponent } from './shared/components/search-new-chat-friend/search-new-chat-friend.component';


export const routes: Routes = [
    { path: '', redirectTo: '/welcome/signInAccount', pathMatch: 'full' },
    { path: 'welcome', redirectTo: '/welcome/signInAccount', pathMatch: 'full' },
    {
        path: 'home',
        component: HomelayoutComponent,
        children: 
        [
            {
                path: 'chatList',
                component: UserListAndchatUiComponent,
                children:[
                    {
                        path:'search',
                        component:SearchNewChatFriendComponent
                    },
                    {
                        path:":roomId",
                        component: ChatUIComponent
                    }
                ]
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
    }
];
