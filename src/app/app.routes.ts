import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuardFn } from '@auth0/auth0-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeightComponent } from './weight/weight.component';
import { SettingsComponent } from './settings/settings.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { BloodPressureComponent } from './blood-pressure/blood-pressure.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuardFn],
    },
    {
        path: 'weight',
        component: WeightComponent,
        canActivate: [authGuardFn],
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [authGuardFn],
    },
    {
        path: 'measurements',
        component: MeasurementsComponent,
        canActivate: [authGuardFn],
    },
    {
        path: 'blood-pressure',
        component: BloodPressureComponent,
        canActivate: [authGuardFn],
    },

];
