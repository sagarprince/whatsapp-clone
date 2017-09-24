import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { Login } from './login';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    IonicPageModule.forChild(Login),
    ReactiveFormsModule
  ],
  providers: [
    AngularFireAuth
  ]
})
export class LoginModule {}
