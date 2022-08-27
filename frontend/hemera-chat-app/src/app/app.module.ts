import { NgModule } from '@angular/core';
import { ChatService } from '../_services/chat.service';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './chat/chat.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from '../_helpers/HttpRequestInterceptor';
import { SignalRInterceptorProviders } from '../_helpers/SignalRInterceptor';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ChatComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    httpInterceptorProviders,
    SignalRInterceptorProviders,
    ChatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
