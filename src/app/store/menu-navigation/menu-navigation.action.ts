import { MenuConfigModel } from "../../shared/models/menu-config.model";

export namespace MenuNavigationAction
{

    export class SetMenuData
    {
        static readonly type = '[SetMenuData] Set SetMenuData data';
        constructor(public items: MenuConfigModel[]) { }
    }

    export class SelectMenu
    {
        static readonly type = '[SelectMenu] Menu Selected';
        constructor(public item: MenuConfigModel ) { }
    }

    export class UpdateMenuCurrentUrl
    {
        static readonly type = '[UpdateMenuCurrentUrl] UpdateMenuCurrentUrl';
        constructor(public key: string,public url:string) { }
    }

    export class ClearState
    {
        static readonly type = '[ClearState] Clear State';
        constructor() { }
    }
}
