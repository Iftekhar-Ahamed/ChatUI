import { ChatListState } from './chatList/chatList.state';
import { itemLinkState } from './itemLink/itemLink.state';
import { RoomSate } from './rooms/rooms.state';
import { UserActionsState} from './user-actions/user-actions.state';
import {UserInfoState} from "./user-info/user-info.state";
export * from '../store/chatList/chatList.action';
export * from '../store/chatList/chatList.state';

export const AppState =
[
    ChatListState,
    itemLinkState,
    UserInfoState,
    RoomSate,
    UserActionsState
];
