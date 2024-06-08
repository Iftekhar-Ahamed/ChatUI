import { ChatListModel } from "../../shared/models/chatList.model";
import { ItemLinkModel } from "../../shared/models/itemLink.model";
import { LogedInUser, User } from "../../shared/models/user.model";

export namespace ItemLinkAction {
    export class SetItemLinkData {
        static readonly type = '[SetItemLinkData] Set ItemLink data';
        constructor(public items: ItemLinkModel[]) { }
    }
    export class SelectItemLink {
        static readonly type = '[SelectItemLink] Item Selected';
        constructor(public item: ItemLinkModel) { }
    }
}       