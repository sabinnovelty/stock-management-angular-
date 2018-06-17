import { Routes,RouterModule } from '@angular/router';
import { ManageSupplier } from './sidebarComponent/ManageSupplier/manageSupplier.component';
import { ManageInventory } from './sidebarComponent/ManageInventory/manageInventory.component';

const sidebarRoutes:Routes=[
    // { path :'manageSupplier', component: ManageSupplier },
    // { path :'manageInventory', component: ManageInventory },
]

export const sidebarRouting=RouterModule.forRoot(sidebarRoutes);