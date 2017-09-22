import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuperAdminComponent } from './super-admin.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

import { UserSetupComponent } from '../components/user-setup/user-setup.component';

import { ClientSetupComponent } from '../components/client-setup/client-setup.component';
import { AddEditClientSetupComponent } from '../components/client-setup/add-edit-client-setup/add-edit-client-setup.component';

import { VendorSetupComponent } from '../components/vendor-setup/vendor-setup.component';
import { QueueSetupComponent } from '../components/queue-setup/queue-setup.component';

const routes: Routes = [     
    { 
      path: '', 
      component: SuperAdminComponent,
      children: [
          { 
            path: '',
            redirectTo: 'dashboard', 
            pathMatch: 'full' 
        },
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'client-setup',
            component: ClientSetupComponent
        },
        {
            path: 'client-setup/add',
            component: AddEditClientSetupComponent
        },
        {
            path: 'user-setup',
            component: UserSetupComponent
        },
        {
            path: 'vendor-setup',
            component: VendorSetupComponent
        },
        {
            path: 'queue-setup',
            component: QueueSetupComponent
        }
      ]
    }
]; 
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    
  ]
})
export class SuperAdminRoutingModule { }
