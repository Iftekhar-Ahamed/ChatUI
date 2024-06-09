export interface Message {
    author: string,
    message: string,
    messageDateTime: Date,
    id: string
}
export interface Room {
    roomId: string,
    roomName: string,
    lastMessage: string,
    lastMessageTime: Date,
    isRead: boolean,
    messages: Message[]
}