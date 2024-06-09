import { ItemLinkModel } from "../../shared/models/itemLink.model";
import { Room } from "../../shared/models/message.model";

export namespace RoomsAction {
    export class SetRoomsData {
        static readonly type = '[SetItemLinkData] Set ItemLink data';
        constructor(public rooms: Room[]) { }
    }
    export class SelectItemLink {
        static readonly type = '[SelectItemLink] Item Selected';
        constructor(public key: string) { }
    }
}       