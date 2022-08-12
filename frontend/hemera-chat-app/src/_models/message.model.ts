export class Message {
    UniqueId : string;
    Sender : number;
    Reciever : number;
    Content : string;
    ReplayFromUserId : number;
    Type : number;
    TransferType : number;
    ReactType : number;
    CreatedDate : Date;
    IsSeen : boolean;
    IsSenderDeleted : boolean;
    IsReceiverDeleted : boolean;
    ConnectionId : string;
}