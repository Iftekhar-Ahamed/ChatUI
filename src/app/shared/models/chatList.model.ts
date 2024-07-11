import { User } from "./user.model";

export interface ChatListModel {
    startNewChat : StartNewChatProperty;
    users: User[];
}
export interface StartNewChatProperty{
    isSelected:boolean
}