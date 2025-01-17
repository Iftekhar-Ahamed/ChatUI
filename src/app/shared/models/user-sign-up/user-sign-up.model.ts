import {NameElementDto} from "../user-info/user-info-response.model";

export interface UserSignUpRequest{
    name : NameElementDto;
    dob : string;
    email : string;
    password: string;
    contactNumberCountryCode : string | null;
    contactNumber : string | null;
    userId : number | null;
}