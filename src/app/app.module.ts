import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/Login/auth.component';

import { routing } from './app.routing';
import { AuthenticationService, HttpClient } from './services/index';
import { DashboardComponent } from  './components/Dashboard/dashboard.component';
import { HeaderComponent } from './components/common/header.component';
 

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [AuthenticationService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
