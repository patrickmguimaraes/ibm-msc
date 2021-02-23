import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AlertService } from 'src/_services/alert.service';
import { AuthGuard } from 'src/_guards';
import { AuthenticationService, TicketService } from 'src/_services';
import { UserService } from 'src/_services';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from 'src/_helpers';
import { APP_BASE_HREF } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from 'src/_directives';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    PageNotFoundComponent,
    HomeComponent,
    TicketComponent,
    TicketsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    TicketService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [ AlertComponent ],
})
export class AppModule { }
