import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {HomeRoutes} from './components/home/index';
import {LoginComponent} from './components/front/index';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    ...HomeRoutes,

    {path: '**', redirectTo: ''}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true, preloadingStrategy: PreloadAllModules});