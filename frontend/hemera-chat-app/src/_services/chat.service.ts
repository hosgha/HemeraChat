import { EventEmitter, Injectable } from '@angular/core';  
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Message } from '../_models/message.model';
import { StorageService } from '../_services/storage.service';
  
@Injectable()  
export class ChatService {  
  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();
  private _hubConnection: HubConnection;
  connectionIsEstablished = false;
  
  constructor(
    private storageService: StorageService
  ) {  
    this.createAndStartConnection();  
    this.registerOnServerEvents();  
    this.startConnection();
  }
  
  sendDirectMessage(message: Message) : boolean {
    if(this._hubConnection && this._hubConnection.state === "Connected") {      
      this._hubConnection.invoke('SendDirectMessage', message)
      .then(() => {
        return true;
      })
      .catch( err => {
        console.log(`Sending direct message is failed! error: ${err}`)
        return false;
      });
      
      return true;

    } else { return false; }
  }  
  
  private createAndStartConnection() {      
    let jwtObject = this.storageService.getUser();
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl('http://localhost:5199/ChatHub', { accessTokenFactory: () =>  jwtObject.token})
      .withAutomaticReconnect()
      .build();
  }
  
  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log(`Error while establishing connection, error: ${err}, retrying... `);  
        setTimeout(() => { this.startConnection(); }, 1000);
      });  
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('ReceivedMessage', (message: Message) => {
      this.messageReceived.emit(message);
    });  
  }

  closeConnection() {
    if (this._hubConnection) {
      this._hubConnection.stop();
   }
  }
}   