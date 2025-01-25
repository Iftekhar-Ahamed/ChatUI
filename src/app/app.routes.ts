import {Routes} from '@angular/router';
import {SignInComponent} from './shared/components/sign-in/sign-in.component';
import {SignUpComponent} from './shared/components/sign-up/sign-up.component';
import {WelcomeLayoutComponent} from './layout/welcome-layout/welcome-layout.component';
import {SearchNewChatFriendComponent} from './component/search-new-chat-friend/search-new-chat-friend.component';
import {ConversationComponent} from './component/conversation/conversation.component';
import {authGuard} from "./guards/auth-guard.guard";
import {ChatLayoutComponent} from "./layout/chat-layout/chat-layout.component";
import {HomeLayoutComponent} from "./layout/home-layout/home-layout.component";
import {MessageRequestLayoutComponent} from "./layout/message-request-layout/message-request-layout.component";
import {ProfileLayoutComponent} from "./layout/profile-layout/profile-layout.component";
import {DateTimePickerComponent} from "./shared/components/date-time-picker/date-time-picker.component";


export const routes: Routes = [
  { path: '', redirectTo: '/welcome/sign-in', pathMatch: 'full' },
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
        path:"chat",
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
    path: 'profile',
    component: ProfileLayoutComponent,
    canActivate : [authGuard]
  },
  {
      path: 'welcome',
      component: WelcomeLayoutComponent,
      children:
      [
          {
              path: 'sign-in',
              component: SignInComponent,
          },
          {
              path: 'sign-up',
              component: SignUpComponent
          }
      ]
  },
  {
    path:'test',
    component : DateTimePickerComponent
  },
  {
    path: '**',
    redirectTo: '/welcome/sign-in'
  }
];
