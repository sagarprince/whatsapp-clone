// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

// Modules
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Components
import { SuperAdminComponent } from './super-admin.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

import { UserSetupComponent } from '../components/user-setup/user-setup.component';
import { AddEditUserSetupComponent } from '../components/user-setup/add-edit-user-setup/add-edit-user-setup.component';

import { ClientSetupComponent } from '../components/client-setup/client-setup.component';
import { AddEditClientSetupComponent } from '../components/client-setup/add-edit-client-setup/add-edit-client-setup.component';
import { ClientInformationComponent } from '../components/client-setup/add-edit-client-setup/client-information/client-information.component';
import { SiteSettingsComponent } from '../components/client-setup/add-edit-client-setup/site-settings/site-settings.component';
import { BasicSettingsComponent } from '../components/client-setup/add-edit-client-setup/site-settings/basic-settings/basic-settings.component';
import { EmailSettingsComponent } from '../components/client-setup/add-edit-client-setup/site-settings/email-settings/email-settings.component';
import { UserFormFieldsSettingsComponent } from '../components/client-setup/add-edit-client-setup/site-settings/user-form-fields-settings/user-form-fields-settings.component';

import { VendorSetupComponent } from '../components/vendor-setup/vendor-setup.component';
import { AddEditVendorSetupComponent } from '../components/vendor-setup/add-edit-vendor-setup/add-edit-vendor-setup.component';

import { QueueSetupComponent } from '../components/queue-setup/queue-setup.component';
import { AddEditQueueSetupComponent } from '../components/queue-setup/add-edit-queue-setup/add-edit-queue-setup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
    SuperAdminRoutingModule,
    SharedModule
  ],
  declarations: [
    SuperAdminComponent,
    DashboardComponent,

    UserSetupComponent,
    AddEditUserSetupComponent,

    ClientSetupComponent,
    AddEditClientSetupComponent,
    ClientInformationComponent,
    SiteSettingsComponent,
    BasicSettingsComponent,
    EmailSettingsComponent,
    UserFormFieldsSettingsComponent,

    VendorSetupComponent,
    AddEditVendorSetupComponent,

    QueueSetupComponent,
    AddEditQueueSetupComponent
  ],
  exports: [
    SuperAdminComponent
  ],
  entryComponents: [
    AddEditUserSetupComponent,    
    AddEditVendorSetupComponent,
    AddEditQueueSetupComponent
  ]
})
export class SuperAdminModule { }
