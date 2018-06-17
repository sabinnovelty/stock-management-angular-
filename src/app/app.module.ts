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
import { HeaderComponent } from './components/common/header/header.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component'
import { sidebarRouting } from './components/common/sidebar/sidebar.routes';
import { ManageSupplier } from './components/common/sidebar/sidebarComponent/ManageSupplier/manageSupplier.component';
import { ManageInventory } from './components/common/sidebar/sidebarComponent/ManageInventory/manageInventory.component';

import { SupplierService } from './services/supplierServices';
import { ProductService } from './services/productService';
import { SearchComponent } from './components/search/search.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { InventoryService } from './services/inventoryService';
 

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ManageSupplier,
    ManageInventory,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    HttpModule,
    sidebarRouting,
    ToasterModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService,HttpClient,SupplierService,ProductService,InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
