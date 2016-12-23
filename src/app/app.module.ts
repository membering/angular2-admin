import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app.routes';
import {HomeModule} from './components/home/home.module';

import {AppComponent} from './app.component';
import {LoginComponent, RegisterComponent} from './components/front/index';

import {AlertService} from './services/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        HomeModule
    ],
    declarations: [
        AppComponent,
        LoginComponent, RegisterComponent
    ],
    providers: [
        AlertService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}