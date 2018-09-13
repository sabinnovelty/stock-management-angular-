import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/Login/auth.component';

import { Routing } from './app.routing';
import { AuthenticationService, HttpClient } from './services/index';
import { DashboardComponent } from './components/Dashboard/dashboard.component';
import { HeaderComponent } from './components/common/header/header.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component'
import { sidebarRouting } from './components/common/sidebar/sidebar.routes';
import { ManageSupplier } from './components/common/sidebar/sidebarComponent/ManageSupplier/manageSupplier.component';
import { ManageInventory } from './components/common/sidebar/sidebarComponent/ManageInventory/manageInventory.component';

import { SupplierService } from './services/supplierServices';
import { ProductService } from './services/productService';
import { SearchComponent } from './components/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToasterModule, ToasterService } from 'angular2-toaster';
import { InventoryService } from './services/inventoryService';
import { SupplierListComponent } from './components/common/sidebar/sidebarComponent/Supplier/supplier.component';
import { SalesListComponent } from './components/common/sidebar/sidebarComponent/Sales/sales.component';
import { CustomerListComponent } from './components/common/sidebar/sidebarComponent/Customers/customer.component';
import { ProductCategoryComponent } from './common/sidebar/sidebar-component/manage-inventory/product-category/product-category.component';
import { ProductCategory } from './components/common/sidebar/sidebarComponent/ProductCategory/product-category.component';
import { AddSalesComponent } from './components/common/sidebar/sidebarComponent/Sales/add-sales/add-sales.component';
import { AuthGuard } from './guards/auth.guard';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ManageSupplier,
    ManageInventory,
    SearchComponent,
    SupplierListComponent,
    SalesListComponent,
    CustomerListComponent,
    ProductCategoryComponent,
    ProductCategory,
    AddSalesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    sidebarRouting,
    ToasterModule.forRoot(),
    RouterModule.forRoot(Routing),
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [
    AuthenticationService,
    HttpClient,
    SupplierService,
    ProductService,
    InventoryService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
