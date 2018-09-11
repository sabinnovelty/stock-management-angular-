import { Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication';
import { DashboardComponent } from './components/Dashboard/dashboard.component';
import { RouteSecure } from './routes/route.secure';
import { RoutePublic } from './routes/route.public';

export const Routing: Routes = [
    { path: '', component: AuthenticationComponent, children: RoutePublic },
    { path: '', component: DashboardComponent, children: RouteSecure },
    { path: '**', redirectTo: '' }
]