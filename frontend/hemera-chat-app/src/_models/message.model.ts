export class Message {
    sender : string;
    receiver : string;
    content : string;
    replayFromUserId : number;
    type : number;
    reactType : number;
    createdDate : Date;
    isSeen : boolean;
    isSenderDeleted : boolean;
    isReceiverDeleted : boolean;
    connectionId : string;
}