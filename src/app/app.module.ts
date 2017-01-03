import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ToastyModule} from 'ng2-toasty';

import {AppRoutingModule} from './app.routes';
import {HomeModule} from './components/home/home.module';

import {AppComponent} from './app.component';
import {Page404Component} from './components/front/pages/index';
import {LoginComponent, RegisterComponent} from './components/front/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        HttpModule,
        ToastyModule.forRoot(),
        AppRoutingModule,
        HomeModule
    ],
    declarations: [
        AppComponent,
        Page404Component,
        LoginComponent, RegisterComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}