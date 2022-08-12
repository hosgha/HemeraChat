import { Component, NgZone, Renderer2, ElementRef, ViewChild } from '@angular/core';  
import { TransferType } from '../../_enums/transfer-type';
import { Message } from '../../_models/message.model';  
import { ChatService } from '../../_services/chat.service';  
  
@Component({  
  selector: 'app-root',  
  templateUrl: './chat.component.html',  
  styleUrls: ['./chat.component.css']  
})  
export class ChatComponent {  
  @ViewChild('menuItem') menuItem!: ElementRef;
  @ViewChild('mainDiv') mainDiv!: ElementRef;
  title = 'ClientApp';  
  txtMessage: string = '';  
  uniqueID: string = new Date().getTime().toString();  
  messages = new Array<Message>();  
  message : Message = new Message();  

  constructor(  
    private chatService: ChatService,  
    private _ngZone: NgZone,
    private renderer: Renderer2
  ) {  
    this.subscribeToEvents();
      
  }  

  sendMessage(): void {  
    if (this.txtMessage) {  
      this.message.UniqueId = this.uniqueID;  
      this.message.TransferType = TransferType.sent;  
      this.message.Content = this.txtMessage;  
      this.message.CreatedDate = new Date();  
      this.messages.push(this.message);  
      this.chatService.sendMessage(this.message);  
      this.txtMessage = '';  
    }  
  }  
  private subscribeToEvents(): void {  
  
    this.chatService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {
        if (message.UniqueId !== this.uniqueID) {  
          message.TransferType = TransferType.received;  
          this.messages.push(message);  
        }  
      });  
    });  
  }  

  openNav() {
    this.renderer.setStyle(this.menuItem.nativeElement, 'width', '250px');
    this.renderer.setStyle(this.mainDiv.nativeElement, 'marginLeft', '250px');
  }
  
  closeNav() {
    this.renderer.setStyle(this.menuItem.nativeElement, 'width', '0');
    this.renderer.setStyle(this.mainDiv.nativeElement, 'marginLeft', '0');
  }
}  