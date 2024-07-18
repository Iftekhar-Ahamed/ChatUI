import { Injectable } from "@angular/core";
import { State, Store } from "@ngxs/store";
export interface userActionStateModel
{

}

@State<userActionStateModel>
(
    {
        name:'userAction'

    }
)

@Injectable()
export class userActionState{

    

    constructor( private store : Store){}

}