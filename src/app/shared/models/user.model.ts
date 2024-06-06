import { UserStatus, UserType } from "../enums/user.enum";

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    status: UserStatus;
    type: UserType;
}

export interface LogedInUser extends User {
    token: string;
}