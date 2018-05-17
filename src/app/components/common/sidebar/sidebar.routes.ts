import { Routes,RouterModule } from '@angular/router';
import { ManageSupplier } from './sidebarComponent/ManageSupplier/manageSupplier.component';

const sidebarRoutes:Routes=[
    { path :'manageSupplier', component: ManageSupplier }
]

export const sidebarRouting=RouterModule.forRoot(sidebarRoutes);