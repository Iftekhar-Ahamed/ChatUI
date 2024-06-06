import { UserStatus, UserType } from "../enums/user.enum";

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    status: UserStatus;
    type: UserType;
    lastMessage: string;
    isSelected: boolean;
}

export interface LogedInUser {
    id: number;
    name: string;
    email: string;
    avatar: string;
    token: string;
}