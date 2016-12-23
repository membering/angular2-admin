import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AUTH_PROVIDERS} from 'angular2-jwt';

import {CardModule} from './card/card.module';
import {ContactModule} from './contact/contact.module';

import {AuthGuard} from '../../_guards/index';
import {HttpClient, Util} from '../../_libraries/index';
import {SidebarDirective, BreadcrumbDirective} from '../../_directives/index';

import {HomeComponent} from './index';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';

@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        CardModule,
        ContactModule
    ],
    declarations: [
        SidebarDirective,
        BreadcrumbDirective,
        DashboardComponent,
        HomeComponent,
        ProfileComponent
    ],
    providers: [
        AUTH_PROVIDERS,
        AuthGuard,
        HttpClient, Util
    ]
})

export class HomeModule {}