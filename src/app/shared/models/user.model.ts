import { UserStatus, UserType } from "../enums/user.enum";
import {NameElementDto} from "./user-info/user-info-response.model";

export interface User {
    id: string;
    name: NameElementDto;
    email: string;
    avatar: string;
    status: UserStatus;
    type: UserType;
    isSelected: boolean;
}

export interface UserInfoModel {
    id: number;
    name: NameElementDto;
    email: string;
    avatar: string;
}
