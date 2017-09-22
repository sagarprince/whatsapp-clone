import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

import { LoginComponent } from '../modules/login/layout/login.component';
import { UserComponent } from '../modules/user/layout/user.component';
import { ForgotPasswordComponent } from '../modules/login/layout/forgot-password.component';

const appRoutes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  }, 
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path:'forgotPassword', 
    component: ForgotPasswordComponent
  },
   { 
    path: 'user', 
    component: UserComponent
  },
  { 
    path: 'admin', 
    loadChildren: '../modules/admin/layout/admin.module#AdminModule'
  },
  { 
    path: 'super-admin', 
    loadChildren: '../modules/super-admin/layout/super-admin.module#SuperAdminModule'
  }

]; 
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { preloadingStrategy: SelectivePreloadingStrategy, useHash: true}
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }
