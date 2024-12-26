import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { RoomsAction } from './rooms.action';
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
                    roomName: "Al-Amin",
                    messages:
                    [
                        {
                            author: "Iftekhar Ahamed",
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
                            author: "Iftekhar Ahamed",
                            message: "Yess!!",
                            messageDateTime: new Date(),
                            id: "3"
                        }, {
                            author: "Iftekhar Ahamed",
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
                            author: "Iftekhar Ahamed",
                            message: "Yess!!",
                            messageDateTime: new Date(),
                            id: "2"
                        }, {
                            author: "Iftekhar Ahamed",
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
                            author: "Iftekhar Ahamed",
                            message: "Yess!!",
                            messageDateTime: new Date(),
                            id: "2"
                        }
                    ],
                    lastMessage: "Yess!!",
                    lastMessageTime: new Date(),
                    isRead: false
                },
                {
                    roomId: "2",
                    roomName: "Sihab",
                    messages:
                    [
                        {
                            author: "Sihab",
                            message: "Hello",
                            messageDateTime: new Date(),
                            id: "1"
                        },
                        {
                            author: "Iftekhar Ahamed",
                            message: "Hi",
                            messageDateTime: new Date(),
                            id: "2"
                        }
                    ],
                    lastMessage: "Hi",
                    lastMessageTime: new Date(),
                    isRead: true
                },{
                    roomId: "3",
                    roomName: "Nirjhor",
                    messages:
                    [
                        {
                            author: "Nirjhor",
                            message: "Hello",
                            messageDateTime: new Date(),
                            id: "1"
                        },
                        {
                            author: "Iftekhar Ahamed",
                            message: "Heyy",
                            messageDateTime: new Date(),
                            id: "2"
                        }
                    ],
                    lastMessage: "Heyy",
                    lastMessageTime: new Date(),
                    isRead: true
                },
            ],
            pev: null,
            current: {
                roomId: "",
                roomName: "",
                messages:
                [
                ],
                lastMessage: "",
                lastMessageTime: new Date(),
                isRead: true
            }
        }
    }
)
@Injectable()
export class RoomSate {

    @Selector()
    static getRoomList(state: RoomsStateModel): Room[]
    {
        return state.rooms;
    }

    @Selector()
    static getRoomById(state: RoomsStateModel): (roomId: string) => Room | null
    {

        return (roomId: string) =>
        {
            return state.rooms.find(x => x.roomId == roomId) || null;
        };

    }

    @Selector()
    static getCurrentRoom(state: RoomsStateModel): Room | null
    {
        return state.current;
    }


    constructor(
        private store: Store
    ) { }

    @Action(RoomsAction.ClearState)
    async clearState(ctx: StateContext<RoomsStateModel>)
    {
        let state = ctx.getState();

        ctx.setState
        (
            {
                ...state,
                current:null,
                pev: null,
                rooms : []
            }
        );
    }

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

    @Action(RoomsAction.AddMessageRoomById)
    async AddMessage(ctx: StateContext<RoomsStateModel>, action: RoomsAction.AddMessageRoomById)
    {

        let state = ctx.getState();
        const room = state.rooms.find(x => x.roomId === action.key);
        if(room)
        {
            room.messages.push(action.msg);
            room.lastMessage = action.msg.message;
        }
    }
}
