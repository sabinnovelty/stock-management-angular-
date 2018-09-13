import { Routes } from '@angular/router';
import { AuthenticationComponent } from '../components/authentication/index';
import { Registration } from '../components/authentication/Registration/registration.component';

export const RoutePublic: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  { path: 'registration', component: Registration }
]