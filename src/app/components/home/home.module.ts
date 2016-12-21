import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HomeComponent} from './index';

import {HttpClient} from '../../_libraries/index';
import {SidebarDirective, BreadcrumbDirective} from '../../_directives/index';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';

@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        FormsModule, ReactiveFormsModule
    ],
    declarations: [
        HomeComponent,
        SidebarDirective,
        BreadcrumbDirective,
        DashboardComponent,
        ProfileComponent
    ],
    providers: [
        HttpClient
    ],
    bootstrap: [HomeComponent]
})

export class HomeModule {}