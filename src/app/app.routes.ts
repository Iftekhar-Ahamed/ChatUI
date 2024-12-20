import { Routes } from '@angular/router';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { WelcomeLayoutComponent } from './layout/welcome-layout/welcome-layout.component';
import { SearchNewChatFriendComponent } from './component/search-new-chat-friend/search-new-chat-friend.component';
import { ChatComponent } from './component/chat/chat.component';
import { ConversationComponent } from './component/conversation/conversation.component';


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
                component: ChatComponent,
                children:[
                    {
                        path:'search',
                        component:SearchNewChatFriendComponent
                    },
                    {
                        path:":roomId",
                        component: ConversationComponent
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
