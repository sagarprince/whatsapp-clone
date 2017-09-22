import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataTableDirective } from 'angular-datatables';

import { DataTablesController } from '../../../../shared/controllers/data-tables.controller';

@Component({
  selector: 'app-cost-center-detail',
  templateUrl: './cost-center-detail.component.html',
  styleUrls: ['./cost-center-detail.component.scss']
})

export class CostCenterDetailComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any = {};

  records: Array<any> = [];    

  jobTypes: Array<any> = [];

  selJobType: string = 'opened';

  dtCtrl: any = null;

  constructor(private _router: Router) { 
    this.jobTypes = [
      {
        key: 'opened',
        name: 'Open Jobs'
      },
      {
        key: 'pending',
        name: 'Pending Jobs'
      },
      {
        key: 'completed',
        name: 'Completed Jobs'
      }
    ];

    this.records = [
          {
          "job_id": "0004",
          "job_name": "Job 2",
          "group": "Group 2",
          "submitted_date": "2017-04-07, 09:32 PM",
          "status": "Approved",
          "cost": "BOA-NY"
          
      },
          {
          "job_id": "0005",
          "job_name": "Job 4",
          "group": "Group 3",
          "submitted_date": "2017-04-07, 09:32 PM",
          "status": "Approved",
          "cost": "BOA-MT"
          
      },
          {
          "job_id": "0005",
          "job_name": "Job 1",
          "status": "Approval Pending",
          "submitted_date": "2017-03-15, 08:26 PM",
          "cost": "2017-03-26, 11:53 AM",
          "group": "BOA-TX"
      },
          {
          "job_id": "0004",
          "job_name": "Job 4",
          "status": "Approval Pending",
          "submitted_date": "2017-02-20, 01:05 PM",
          "cost": "2017-07-22, 09:57 PM",
          "group": "BOA-LA"
      },
          {
          "job_id": "0003",
          "job_name": "Job 3",
          "status": "Approved",
          "submitted_date": "2016-12-21, 05:10 PM",
          "cost": "BOA-GA",
          "group": "Group 6"
      },
          {
          "job_id": "0004",
          "job_name": "Job 3",
          "status": "Approved",
          "submitted_date": "2017-02-19, 11:31 PM",
          "cost": "BOA-PA",
          "group": "Group 2"
      },
          {
          "job_id": "0004",
          "job_name": "Job 1",
          "status": "Approved",
          "submitted_date": "2017-07-12, 06:06 PM",
          "cost": "BOA-SC",
          "group": "Group 4"
      },
          {
          "job_id": "0005",
          "job_name": "Job 1",
          "status": "Approved",
          "submitted_date": "2016-06-02, 06:07 AM",
          "cost": "BOA-SC",
          "group": "Group 2"
      },
          {
          "job_id": "0005",
          "job_name": "Job 4",
          "status": "Approval Pending",
          "submitted_date": "2017-03-18, 09:06 AM",
          "cost": "BOA-NZ",
          "group": "Group 2"
      },
          {
          "job_id": "0003",
          "job_name": "Job 1",
          "status": "Approved",
          "submitted_date": "2016-03-16, 09:27 AM",
          "cost": "BOA-MI",
          "group": "Group 1"
      },
          {
          "job_id": "0004",
          "job_name": "Job 3",
          "status": "Approved",
          "submitted_date": "2016-06-14, 06:11 PM",
          "cost": "BOA-MA",
          "group": "Group 1"
      },
          {
          "job_id": "0003",
          "job_name": "Job 1",
          "status": "Approved",
          "submitted_date": "2016-04-01, 02:40 PM",
          "cost": "BOA-MI",
          "group": "Group 2"
      },
          {
          "job_id": "0006",
          "job_name": "Job 2",
          "status": "Approved",
          "submitted_date": "2017-03-15, 07:07 AM",
          "cost": "BOA-PA",
          "group": "Group 2"
      },
          {
          "job_id": "0005",
          "job_name": "Job 5",
          "status": "Approved",
          "submitted_date": "2016-07-31, 07:15 PM",
          "cost": "BOA-SC",
          "group": "Group 4"
      },
          {
          "job_id": "0007",
          "job_name": "Job 2",
          "status": "Approved",
          "submitted_date": "2016-12-03, 07:46 AM",
          "cost": "BOA-MI",
          "group": "Group 1"
      },
          {
          "job_id": "0003",
          "job_name": "Job 5",
          "status": "Approval Pending",
          "submitted_date": "2017-05-26, 05:48 AM",
          "cost": "BOA-AZ",
          "group": "Group 4"
      },
          {
          "job_id": "0002",
          "job_name": "Job 6",
          "status": "Approved",
          "submitted_date": "2016-11-09, 01:23 PM",
          "cost": "BOA-PA",
          "group": "Group 4"
      },
          {
          "job_id": "0005",
          "job_name": "Job 2",
          "status": "Approved",
          "submitted_date": "2016-01-04, 08:07 PM",
          "cost": "BOA-GA",
          "group": "Group 4"
      },
          {
          "job_id": "0002",
          "job_name": "Job 4",
          "status": "Approval Pending",
          "submitted_date": "2016-07-13, 11:56 PM",
          "cost": "BOA-LA",
          "group": "Group 2"
      },
          {
          "job_id": "0003",
          "job_name": "Job 3",
          "status": "Approval Pending",
          "submitted_date": "2017-07-09, 05:55 PM",
          "cost": "BOA-MT",
          "group": "Group 1"
      },
          {
          "job_id": "0004",
          "job_name": "Job 2",
          "status": "Approved",
          "submitted_date": "2016-07-24, 11:05 PM",
          "cost": "BOA-MI",
          "group": "Group 1"
      },
          {
          "job_id": "0005",
          "job_name": "Job 6",
          "status": "Approval Pending",
          "submitted_date": "2016-06-01, 11:41 AM",
          "cost": "BOA-NY",
          "group": "Group 1"
      },
          {
          "job_id": "0003",
          "job_name": "Job 3",
          "status": "Approved",
          "submitted_date": "2016-01-22, 04:47 PM",
          "cost": "BOA-AZ",
          "group": "Group 2"
      },
          {
          "job_id": "0005",
          "job_name": "Job 4",
          "status": "Approval Pending",
          "submitted_date": "2017-03-20, 12:17 AM",
          "cost": "BOA-MI",
          "group": "Group 4"
      },
          {
          "job_id": "0007",
          "job_name": "Job 4",
          "status": "Approved",
          "submitted_date": "2016-08-23, 02:13 AM",
          "cost": "BOA-SC",
          "group": "Group 1"
      },
          {
          "job_id": "0003",
          "job_name": "Job 3",
          "status": "Approval Pending",
          "submitted_date": "2016-08-27, 07:20 AM",
          "cost": "BOA-PA",
          "group": "Group 1"
      },
          {
          "job_id": "0007",
          "job_name": "Job 1",
          "status": "Approved",
          "submitted_date": "2016-10-03, 01:16 AM",
          "cost": "BOA-GA",
          "group": "Group 3"
      },
          {
          "job_id": "0007",
          "job_name": "Job 1",
          "status": "Approved",
          "submitted_date": "2016-02-15, 11:18 AM",
          "cost": "BOA-LA",
          "group": "Group 4"
      },
          {
          "job_id": "0006",
          "job_name": "Job 2",
          "status": "Approved",
          "submitted_date": "2017-03-14, 06:01 PM",
          "cost": "BOA-TX",
          "group": "Group 2"
      },
          {
          "job_id": "0002",
          "job_name": "Job 5",
          "status": "Approved",
          "submitted_date": "2016-02-18, 02:15 PM",
          "cost": "BOA-ND",
          "group": "Group 4"
      }
    ];
  }

  ngOnInit(): void{
    this.dtCtrl = new DataTablesController({
          aoColumnDefs: [
              { 
                  bSortable: true,                     
                  aTargets: [5]
              }
          ],
          dom: '<<"dataTable-toolbar"><t>ipl>',
      });
      this.dtOptions = this.dtCtrl.dataTableOptions;
      this.dtCtrl.dataTableInstanceInit(this.dtElement, (dtInstance, inputEl) => {                
          inputEl.on( 'keyup change', function () {
              let that = $(this);
              let index = that.attr('data-index');                
              dtInstance.columns(index).search(this.value).draw();
          });
      });
  }  

  gotoJobDetails(id: any) {        
    this._router.navigate(['admin/jobs/job-details/' + id]);
  }

  ngOnDestroy() {
    this.dtCtrl.destroy();
  }
  
}

