import {FriendshipStatus} from "../../enums/user.enum";

export interface SearchResultModel{
  id : number,
  name : string,
  avatar : string,
  friendshipStatus : FriendshipStatus,
  isSelected:boolean,
  activeStatus : boolean
}
