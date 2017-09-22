import { AuthGuard } from './../modules/login/layout/authguard.component';
import { UserComponent } from './../modules/user/layout/user.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { httpFactory } from "./http.factory";

import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router }  from  '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from '../modules/shared/shared.module';

import { LoginModule } from '../modules/login/layout/login.module';

import { AdminModule } from '../modules/admin/layout/admin.module';

import { LoaderService } from '../modules/shared/components/loader/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    LoginModule,
    AdminModule
  ],
  providers: [
    AuthGuard,
    {
        provide: Http,
        useFactory: httpFactory,
        deps: [XHRBackend, RequestOptions, LoaderService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
