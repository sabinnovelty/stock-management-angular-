import { Routes } from '@angular/router';
import { AuthenticationComponent } from '../components/authentication/index';


export const RoutePublic: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path :'login', component: AuthenticationComponent }
  ]