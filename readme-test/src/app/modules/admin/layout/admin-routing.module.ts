import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

import { FacilitiesComponent } from '../components/facilities/facilities.component';
import { FacilityGroupsComponent } from '../components/facilities/facilitygroups/facilitygroups.component';

import { GroupsComponent } from '../components/groups/groups.component';
import { AddEditGroupsComponent } from '../components/groups/add-edit-groups/add-edit-groups.component';

import { UsersComponent } from '../components/users/users.component';

import { JobsComponent } from '../components/jobs/jobs.component';
import { JobsDetailsComponent } from '../components/jobs/jobs-details/jobs-details.component';

import { ProductsComponent } from '../components/products/products.component';
import { ReportsComponent } from '../components/reports/reports.component';

import { CostCenterComponent } from '../components/cost-center/cost-center.component';
import { CostCenterDetailComponent } from '../components/cost-center/cost-center-detail/cost-center-detail.component';

const routes: Routes = [     
    { 
      path: '', 
      component: AdminComponent,
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
            path: 'facilities',
            component: FacilitiesComponent
        },
        {
            path: 'facilities/facility/:fid/groups',
            component: FacilityGroupsComponent
        },
        {
            path: 'facilities/facility/:fid/groups/add',
            component: AddEditGroupsComponent,
            data: {
                mode: 'add',
                from: 'facilities'
            }
        },
        {
            path: 'facilities/facility/:fid/groups/edit/:id',
            component: AddEditGroupsComponent,
            data: {
                mode: 'edit',
                from: 'facilities'
            }
        },
        {
            path: 'facilities/facility/:fid/groups/details/:id',
            component: AddEditGroupsComponent,
            data: {
                mode: 'details',
                from: 'facilities'
            }
        },
        {
            path: 'groups',
            component: GroupsComponent
        },
        {
            path: 'groups/add',
            component: AddEditGroupsComponent,
            data: {
                mode: 'add',
                from: 'groups'
            }
        },
        {
            path: 'groups/edit/:id',
            component: AddEditGroupsComponent,
            data: {
                mode: 'edit',
                from: 'groups'
            }
        },
        {
            path: 'groups/details/:id',
            component: AddEditGroupsComponent,
            data: {
                mode: 'details',
                from: 'groups'
            }
        },
        {
            path: 'users',
            component: UsersComponent
        },
        {
            path: 'jobs',
            component: JobsComponent
        },
        {
            path: 'jobs/job-details/:id',
            component: JobsDetailsComponent
        },
        {
            path: 'products',
            component: ProductsComponent
        },
        {
            path: 'reports',
            component: ReportsComponent
        },
        {
            path: 'cost-center',
            component: CostCenterComponent
        },
        {
            path: 'cost-center/cost-center-details/1',
            component: CostCenterDetailComponent
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
export class AdminRoutingModule { }
