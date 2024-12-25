import { Routes } from '@angular/router';
import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { WelcomeLayoutComponent } from './layout/welcome-layout/welcome-layout.component';
import { SearchNewChatFriendComponent } from './component/search-new-chat-friend/search-new-chat-friend.component';
import { ConversationComponent } from './component/conversation/conversation.component';
import {authGuard} from "./guards/auth-guard.guard";
import {MessageRequestComponent} from "./component/message-request/message-request.component";
import {ChatLayoutComponent} from "./layout/chat-layout/chat-layout.component";
import {HomeLayoutComponent} from "./layout/home-layout/home-layout.component";
import {MessageRequestLayoutComponent} from "./layout/message-request-layout/message-request-layout.component";


export const routes: Routes = [
  { path: '', redirectTo: '/welcome/signInAccount', pathMatch: 'full' },
  {
      path: 'home',
      component: HomeLayoutComponent,
      canActivate : [authGuard]
  },
  {
    path: 'all-chat',
    component: ChatLayoutComponent,
    canActivate : [authGuard],
    children:[
      {
        path:'search',
        component:SearchNewChatFriendComponent
      },
      {
        path:":chat",
        component: ConversationComponent
      }
    ]
  },
  {
    path: 'message-request',
    component: MessageRequestLayoutComponent,
    canActivate : [authGuard]
  },
  {
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
  {
    path: '**',
    redirectTo: '/welcome/signInAccount'
  }
];
