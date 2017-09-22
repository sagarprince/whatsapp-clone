import { UrlDetails } from './../../../model/url/url-details.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpService} from '../../../service/http.service';
import { Http, Response} from '@angular/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent    
  ],
  exports: [
    LoginComponent,
    ForgotPasswordComponent
  ],
   providers: [HttpService, UrlDetails],
})
export class LoginModule { }
