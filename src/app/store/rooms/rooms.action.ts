import { Message, Room } from "../../shared/models/message.model";

export namespace RoomsAction {

    export class SetRoomsData {

        static readonly type = '[SetItemLinkData] Set ItemLink data';

        constructor(public rooms: Room[]) { }

    }

    export class SelectRoom {

        static readonly type = '[SelectRoom] Room Selected';
        
        constructor(public key: string) { }

    }

    export class AddMessageRoomById {

        static readonly type = '[AddMessageIntoCurrentRoom] Message Added';

        constructor(public key: string, public msg: Message) { }

    }
}       