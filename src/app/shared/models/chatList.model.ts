import { User } from "./user.model";

export interface ChatListModel {
    users: User[];
    isSelected: boolean;
}