import { Component, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';  
import { Message } from '../../_models/message.model';
import { ContactInfo as UserInfo } from '../../_models/contact-info.model';
import { ContactMessages } from '../../_models/contact-messages';
import { ChatService } from '../../_services/chat.service';
import { AuthService } from '../../_services/auth.service';
import { ContactService } from '../../_services/contact.service';
import {Router} from "@angular/router";

@Component({  
  selector: 'app-root',  
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']  
})  
export class ChatComponent implements OnInit {  
  @ViewChild('menuItem') menuItem!: ElementRef;
  @ViewChild('mainDiv') mainDiv!: ElementRef;
  title = 'ClientApp';  
  txtMessage: string = '';  
  currentUser: UserInfo;
  selectedContact: UserInfo;
  contactMessages : ContactMessages[] = [];
  selectedContactMessages : Message[];
  contacts : UserInfo[] = [];

  constructor(  
    private renderer: Renderer2,
    private chatService: ChatService,  
    private authService: AuthService,
    private contactService: ContactService,
    private router: Router
  ) {  
    this.subscribeToEvents();
  }

  ngOnInit(): void {
    let userName = localStorage.getItem('username') || '';

    this.contactService.getContacts().subscribe((res : UserInfo[]) => {
      let currentUser = res.find((contact) => contact.userName == userName);

      if(currentUser) {
        this.currentUser = currentUser;    
      
        let contacts = res.filter(contact => contact.id != this.currentUser?.id);
        if(contacts)
          this.contacts = contacts;   
      }
     });
  }

  sendMessage(): void {  
    if (this.txtMessage && this.selectedContact) {
      let message = new Message();
      message.content = this.txtMessage;  
      message.createdDate = new Date();
      message.sender = this.currentUser.id;      
      message.receiver = this.selectedContact.id;                           
      var isSuccess = this.chatService.sendDirectMessage(message);
      if(isSuccess) {
        this.pushToContactMessages(message);
        this.txtMessage = '';
      } else {
        alert('Connection refused!');
        
        this.router.navigate(['/chat'])
        .then(() => {
          window.location.reload();
        });
      }
    }
  }  
  private subscribeToEvents(): void {  
  
    this.chatService.messageReceived.subscribe((message: Message) => {
      this.pushToContactMessages(message);
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
    this.chatService.closeConnection();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  selectContact($event: UserInfo) {
    if(!this.selectedContact || (this.selectedContact && $event.id != this.selectedContact.id)) {
      this.txtMessage = "";
      this.selectedContact = $event;
      let messagesIndex = this.contactMessages
      .findIndex(contact => contact.contactId == this.selectedContact.id);
  
      if(messagesIndex !== -1) {
        this.selectedContactMessages = this.contactMessages[messagesIndex].messages;
      } else {
        this.selectedContactMessages = new Array<Message>();
      }
    }
  }

  trackByMethod(index:number, el:any): number {
    return el.id;
  }

  pushToContactMessages(message: Message) {
    var contactUserId = (message.sender === this.currentUser.id) ? message.receiver : message.sender;
    
    let messagesIndex = this.contactMessages.findIndex(contact => contact.contactId == contactUserId);
    if(messagesIndex !== -1) {
      this.contactMessages[messagesIndex].messages.push(message);
    } else {
      let newContactMessages = new ContactMessages({
        contactId: contactUserId,
        messages: [message]
      });

      this.contactMessages.push(newContactMessages);

      messagesIndex = this.contactMessages.findIndex(contact => contact.contactId == contactUserId);
    }

    let messages = this.contactMessages[messagesIndex].messages;

    this.selectedContactMessages = messages;
  }

}  