import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/index';
import { DashboardComponent } from './components/Dashboard/dashboard.component';
import { ManageSupplier } from './components/common/sidebar/sidebarComponent/ManageSupplier/manageSupplier.component';
import { ManageInventory } from './components/common/sidebar/sidebarComponent/ManageInventory/manageInventory.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';

const app_Routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path:'', redirectTo:"manageInventory",pathMatch:"prefix"},
      { path :'manageSupplier', component: ManageSupplier },
      { path :'manageInventory', component: ManageInventory }
    ]
  },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(app_Routes);