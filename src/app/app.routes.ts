import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuardFn } from '@auth0/auth0-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeightLogComponent } from './weight/weight-log/weight-log.component';
import { SettingsComponent } from './settings/settings.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { BloodPressureComponent } from './blood-pressure/blood-pressure.component';
import { AddNewWeightLogComponent } from './weight/add-new-weight-log/add-new-weight-log.component';

export const routes: Routes = [
    { path: '', redirectTo: 'weight', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuardFn],
    },
    {
        path: 'weight',
        canActivate: [authGuardFn],
        canActivateChild: [authGuardFn],
        children: [
            {
                path: '',
                component: WeightLogComponent,
            },
            {
                path: 'add',
                component: AddNewWeightLogComponent
            }
        ]
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
