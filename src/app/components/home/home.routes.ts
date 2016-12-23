import {Routes} from '@angular/router';

import {AuthGuard} from '../../_guards/index';
import {HomeComponent} from './index';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {cardRoutes} from './card/index';
import {contactRoutes} from './contact/index';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent, data: {name: 'Dashboard'}},
            {path: 'profile', component: ProfileComponent, data: {name: 'Profile'}},
            ...cardRoutes,
            ...contactRoutes
        ],
        canActivate: [AuthGuard]
    }
];