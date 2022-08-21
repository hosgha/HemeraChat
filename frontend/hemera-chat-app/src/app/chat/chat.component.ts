import { Component, NgZone, Renderer2, ElementRef, ViewChild } from '@angular/core';  
import { TransferType } from '../../_enums/transfer-type';
import { Message } from '../../_models/message.model';  
import { ChatService } from '../../_services/chat.service';
import { AuthService } from '../../_services/auth.service';
import {Router} from "@angular/router";

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
  currentUser: string;
  messages = new Array<Message>();  
  message : Message = new Message();  

  constructor(  
    private chatService: ChatService,  
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {  
    this.subscribeToEvents();
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('username') || '';
  }

  sendMessage(): void {  
    if (this.txtMessage) {
      this.message.content = this.txtMessage;  
      this.message.createdDate = new Date();
      this.message.sender = this.currentUser;
      this.messages.push(this.message);  
      this.chatService.sendDirectMessage(this.message);  
      this.txtMessage = '';  
    }  
  }  
  private subscribeToEvents(): void {  
  
    this.chatService.messageReceived.subscribe((message: Message) => {
      this.messages.push(message);
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}  