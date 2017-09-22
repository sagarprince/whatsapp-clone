// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


// Modules
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

import { FacilitiesComponent } from '../components/facilities/facilities.component';
import { AddEditFacilitiesComponent } from '../components/facilities/add-edit-facilities/add-edit-facilities.component';
import { UploadListComponent } from '../components/facilities/upload-list/upload-list.component';
import { FacilityGroupsComponent } from '../components/facilities/facilitygroups/facilitygroups.component';

import { GroupsComponent } from '../components/groups/groups.component';
import { AddEditGroupsComponent } from '../components/groups/add-edit-groups/add-edit-groups.component';
import { AddGroupUserComponent } from '../components/groups/add-group-user/add-group-user.component';

import { UsersComponent } from '../components/users/users.component';
import { AddEditUserComponent } from '../components/users/add-edit-user/add-edit-user.component';

import { JobsComponent } from '../components/jobs/jobs.component';
import { JobsDetailsComponent } from '../components/jobs/jobs-details/jobs-details.component';
import { JobDetailsPaymentMethodComponent } from '../components/jobs/payment-method/payment-method.component';

import { ProductsComponent } from '../components/products/products.component';
import { ReportsComponent } from '../components/reports/reports.component';

import { CostCenterComponent } from '../components/cost-center/cost-center.component';
import { CostCenterDetailComponent } from '../components/cost-center/cost-center-detail/cost-center-detail.component';
import { AddEditCostCenterComponent } from '../components/cost-center/add-edit-cost-center/add-edit-cost-center.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,

    FacilitiesComponent,
    AddEditFacilitiesComponent,
    UploadListComponent,
    FacilityGroupsComponent,

    GroupsComponent,
    AddEditGroupsComponent,
    AddGroupUserComponent,

    UsersComponent,
    AddEditUserComponent,

    JobsComponent,
    JobsDetailsComponent,
    JobDetailsPaymentMethodComponent,   
    
    ProductsComponent,
    ReportsComponent,

    CostCenterComponent,
    CostCenterDetailComponent,
    AddEditCostCenterComponent
  ],
  exports: [
    AdminComponent
  ],
  entryComponents: [
    AddEditFacilitiesComponent,
    UploadListComponent,    
    AddGroupUserComponent,
    AddEditUserComponent,    
    JobDetailsPaymentMethodComponent,
    AddEditCostCenterComponent
  ]
})
export class AdminModule { }
