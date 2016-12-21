import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AUTH_PROVIDERS} from 'angular2-jwt';

import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';

import {AuthGuard} from './_guards/index';

import {HomeModule} from './components/home/home.module';
import {LoginComponent, RegisterComponent} from './components/front/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        HttpModule,
        AppRoutes,
        HomeModule
    ],
    declarations: [
        AppComponent,
        LoginComponent, RegisterComponent
    ],
    providers: [
        AUTH_PROVIDERS,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}