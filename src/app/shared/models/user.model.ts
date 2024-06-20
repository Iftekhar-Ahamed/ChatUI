import { UserStatus, UserType } from "../enums/user.enum";

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    status: UserStatus;
    type: UserType;
    isSelected: boolean;
}

export interface LogedInUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
    token: string;
}