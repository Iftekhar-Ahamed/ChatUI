import { ItemLinkModel } from "../../shared/models/itemLink.model";

export namespace ItemLinkAction 
{

    export class SetItemLinkData 
    {
        static readonly type = '[SetItemLinkData] Set ItemLink data';
        constructor(public items: ItemLinkModel[]) { }
    }

    export class SelectItemLink 
    {
        static readonly type = '[SelectItemLink] Item Selected';
        constructor(public key: string) { }
    }

    export class UpdateUrl 
    {
        static readonly type = '[UpdateUrl] UpdateUrl';
        constructor(public key: string,public url:string) { }
    }

    export class ClearState 
    {
        static readonly type = '[ItemLink] Clear State';
        constructor() { }
    }
}       