import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChatService } from '../services/chat.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
