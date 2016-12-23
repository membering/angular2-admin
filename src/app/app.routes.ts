import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {homeRoutes} from './components/home/index';
import {LoginComponent, RegisterComponent} from './components/front/index';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    ...homeRoutes,

    {path: '**', redirectTo: ''}
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}