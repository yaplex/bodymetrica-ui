import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuardFn } from '@auth0/auth0-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeightLogComponent } from './weight/weight-log/weight-log.component';
import { SettingsComponent } from './settings/settings.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { BloodPressureLogComponent } from './blood-pressure/blood-pressure-log/blood-pressure-log.component';
import { AddNewWeightLogComponent } from './weight/add-new-weight-log/add-new-weight-log.component';
import { AddNewBloodPressureLogComponent } from './blood-pressure/add-new-blood-pressure-log/add-new-blood-pressure-log.component';

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
        canActivate: [authGuardFn],
        canActivateChild: [authGuardFn],
        children: [
            {
                path: '',
                component: BloodPressureLogComponent,
            },
            {
                path: 'add',
                component: AddNewBloodPressureLogComponent
            }
        ]
    },

];
