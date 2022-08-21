import { EventEmitter, Injectable } from '@angular/core';  
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';  
import { Message } from '../_models/message.model';
import { StorageService } from '../_services/storage.service';
  
@Injectable()  
export class ChatService {  
  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  
  
  constructor(
    private storageService: StorageService
  ) {  
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();
  }
  
  sendDirectMessage(message: Message) {
    if(this._hubConnection) {
      
      if(localStorage.getItem('username') == 'nader')
        message.reciever = 'hediyeh';
      else
        message.reciever = 'nader';

      this._hubConnection.invoke('SendDirectMessage', message);
    }  
  }  
  
  private createConnection() {      
    let jwtObject = this.storageService.getUser();
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl('http://localhost:5199/ChatHub', { accessTokenFactory: () =>  jwtObject.token})  
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
        console.log('Error while establishing connection, retrying...');  
        setTimeout(() => { this.startConnection(); }, 5000);
      });  
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('ReceivedMessage', (message: Message) => {
      this.messageReceived.emit(message);  
    });  
  }  
}   