import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { RoomsAction } from './rooms.action';
import { ItemLinkModel } from "../../shared/models/itemLink.model";
import { Room } from "../../shared/models/message.model";

export interface RoomsStateModel {
    rooms: Room[];
    pev: Room | null;
    current: Room | null;
}

@State<RoomsStateModel>
(
    {
        name: 'rooms',
        defaults: 
        {
            rooms: 
            [
                {
                    roomId: "1",
                    roomName: "Room 1",
                    messages: 
                    [
                        {
                            author: "Iftekhar",
                            message: "Hello",
                            messageDateTime: new Date(),
                            id: "1"
                        }, {
                            author: "Al-Amin",
                            message: "Hi",
                            messageDateTime: new Date(),
                            id: "2"
                        },
                        {
                            author: "Iftekhar",
                            message: "Yess!!",
                            messageDateTime: new Date(),
                            id: "3"
                        }, {
                            author: "Iftekhar",
                            message: "Hello",
                            messageDateTime: new Date(),
                            id: "1"
                        }, {
                            author: "Al-Amin",
                            message: "Hi",
                            messageDateTime: new Date(),
                            id: "2"
                        },
                        {
                            author: "Iftekhar",
                            message: "Yess!!",
                            messageDateTime: new Date(),
                            id: "2"
                        }, {
                            author: "Iftekhar",
                            message: "Hello",
                            messageDateTime: new Date(),
                            id: "1"
                        }, {
                            author: "Al-Amin",
                            message: "Hi",
                            messageDateTime: new Date(),
                            id: "2"
                        },
                        {
                            author: "Iftekhar",
                            message: "Yess!!",
                            messageDateTime: new Date(),
                            id: "2"
                        }
                    ],
                    lastMessage: "Hi",
                    lastMessageTime: new Date(),
                    isRead: false
                }, 
                {
                    roomId: "2",
                    roomName: "Room 2",
                    messages: 
                    [
                        {
                            author: "User 3",
                            message: "Hello",
                            messageDateTime: new Date(),
                            id: "1"
                        }, 
                        {
                            author: "User 4",
                            message: "Hi",
                            messageDateTime: new Date(),
                            id: "2"
                        }
                    ],
                    lastMessage: "Hi",
                    lastMessageTime: new Date(),
                    isRead: true
                },
            ],
            pev: null,
            current: null
        }
    }
)
@Injectable()
export class RoomSate {

    @Selector()
    static roomList(state: RoomsStateModel): Room[] 
    {
        return state.rooms;
    }

    @Selector()
    static roomById(state: RoomsStateModel): (roomId: string) => Room | null 
    {

        return (roomId: string) => 
        {
            return state.rooms.find(x => x.roomId == roomId) || null;
        };

    }

    @Selector()
    static currentRoom(state: RoomsStateModel): Room | null 
    {
        return state.current;
    }


    constructor(
        private store: Store
    ) { }
    

    @Action(RoomsAction.SetRoomsData)
    async setItemListData(ctx: StateContext<RoomsStateModel>, action: RoomsAction.SetRoomsData) 
    {
        let state = ctx.getState();
        ctx.setState
        (
            {
                ...state,
                rooms: action.rooms
            }
        );
    }

    @Action(RoomsAction.SelectRoom)
    async selectRoom(ctx: StateContext<RoomsStateModel>, action: RoomsAction.SelectRoom) 
    {

        let state = ctx.getState();

        const actionItem = state.rooms.find(x => x.roomId == action.key);

        const temp = state.current;

        if (actionItem) 
        {

            ctx.setState
            (
                {
                    ...state,
                    current: actionItem,
                    pev: temp
                }
            );

        } 
        else 
        {

            ctx.setState
            (
                {
                    ...state,
                    current: null,
                    pev: temp
                }
            );
        }
    }

    @Action(RoomsAction.AddMessageIntoCurrentRoom)
    async AddMessage(ctx: StateContext<RoomsStateModel>, action: RoomsAction.AddMessageIntoCurrentRoom) 
    {

        let state = ctx.getState();
        state.current?.messages.push(action.msg);

    }
}
