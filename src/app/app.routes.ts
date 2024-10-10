import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuardFn } from '@auth0/auth0-angular';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [authGuardFn],
    },

];
