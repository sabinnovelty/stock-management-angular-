import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from '../components/Dashboard/dashboard.component';
import { ManageSupplier } from '../components/common/sidebar/sidebarComponent/ManageSupplier/manageSupplier.component';
import { ManageInventory } from '../components/common/sidebar/sidebarComponent/ManageInventory/manageInventory.component';
import { SupplierListComponent } from '../components/common/sidebar/sidebarComponent/Supplier/supplier.component';
import { AddSalesComponent } from '../components/common/sidebar/sidebarComponent/Sales/add-sales/add-sales.component';
import { SalesListComponent } from '../components/common/sidebar/sidebarComponent/Sales/sales.component';
import { CustomerListComponent } from '../components/common/sidebar/sidebarComponent/Customers/customer.component';
import { ProductCategory } from '../components/common/sidebar/sidebarComponent/ProductCategory/product-category.component';
import { InventoryReport } from '../components/common/sidebar/sidebarComponent/InventoryReport/inventoryReport.component';
import { InventorySummary } from '../components/common/sidebar/sidebarComponent/InventoryReport/InventorySummary/inventorySummary.component';
import { Notification } from '../components/common/sidebar/sidebarComponent/notifications/notification.component';

export const RouteSecure: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'dashboard', redirectTo: 'manageSupplier', canActivate: [AuthGuard] },
  { 
    path: 'dashboard', canActivate: [AuthGuard],
    children: [
        { path: 'notification', component: Notification, canActivate: [AuthGuard] },
        { path: 'manageSupplier', component: ManageSupplier, canActivate: [AuthGuard] },
        { path: 'manageInventory', component: ManageInventory, canActivate: [AuthGuard] },
        { path: 'inventoryReport', component: InventoryReport, canActivate: [AuthGuard],
          children: [
            {path: 'inventorySummary', component: InventorySummary, canActivate: [AuthGuard] }
          ] 
        },
        { path: 'supplierDetails', component: SupplierListComponent, canActivate: [AuthGuard] },
        { path: 'addSales', component: AddSalesComponent, canActivate: [AuthGuard] },
        { path: 'salesDetails', component: SalesListComponent, canActivate: [AuthGuard] },
        { path: 'customerFetails', component: CustomerListComponent, canActivate: [AuthGuard] },
        { path: 'category', component: ProductCategory, canActivate: [AuthGuard] }
    ]
  }
];