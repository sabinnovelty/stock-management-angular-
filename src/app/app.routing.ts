import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/index';
import { DashboardComponent } from './components/Dashboard/dashboard.component';
import { ManageSupplier } from './components/common/sidebar/sidebarComponent/ManageSupplier/manageSupplier.component';
import { ManageInventory } from './components/common/sidebar/sidebarComponent/ManageInventory/manageInventory.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { SupplierListComponent } from "./components/common/sidebar/sidebarComponent/Supplier/supplier.component"
import { SalesListComponent } from './components/common/sidebar/sidebarComponent/Sales/sales.component';
import { CustomerListComponent } from './components/common/sidebar/sidebarComponent/Customers/customer.component';
import { ProductCategory } from './components/common/sidebar/sidebarComponent/ProductCategory/product-category.component'
import { InventoryReport } from './components/common/sidebar/sidebarComponent/InventoryReport/inventoryReport.component';
import { AddSalesComponent } from './components/common/sidebar/sidebarComponent/Sales/add-sales/add-sales.component';
import { InventorySummary } from './components/common/sidebar/sidebarComponent/InventoryReport/InventorySummary/inventorySummary.component';
import { Notification } from './components/common/sidebar/sidebarComponent/notifications/notification.component'
const app_Routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path:'', redirectTo: 'dashboard',pathMatch:"prefix"},
      { path :'manageSupplier', component: ManageSupplier },
      { path :'manageInventory', component: ManageInventory },
      { path :'notification', component: Notification },
      { path :'supplierDetails', component: SupplierListComponent },
      { path: 'addSales', component: AddSalesComponent },
      { path: 'sales', component: SalesListComponent },
      { path: 'customerDetails', component: CustomerListComponent },
      { path:'category',component:ProductCategory },
      { path:'inventoryReport',component:InventoryReport,children:[
        { path:'inventorySummary',component:InventorySummary }
      ] }
    ]
  },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(app_Routes);