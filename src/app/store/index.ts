import { ChatListState } from './chatList/chatList.state';
import {MenuNavigationState} from './menu-navigation/menu-navigation.state';
import { RoomSate } from './rooms/rooms.state';
import { UserActionsState} from './user-actions/user-actions.state';
import {UserInfoState} from "./user-info/user-info.state";
export * from '../store/chatList/chatList.action';
export * from '../store/chatList/chatList.state';

export const AppState =
[
    ChatListState,
    MenuNavigationState,
    UserInfoState,
    RoomSate,
    UserActionsState
];
