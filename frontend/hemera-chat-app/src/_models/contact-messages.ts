import { Message } from './message.model';

export class ContactMessages {
    contactId : string;
    messages : Message[];

    public constructor(init?:Partial<ContactMessages>) {
        Object.assign(this, init);
    }
}
