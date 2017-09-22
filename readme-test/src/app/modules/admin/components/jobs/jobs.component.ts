import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';

import { DataTablesController } from '../../../shared/controllers/data-tables.controller';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})

export class JobsComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any = {};

  records: Array<any> = [];    

  jobTypes: Array<any> = [];

  selJobType: string = 'opened';

  dtCtrl: any = null;

  constructor() { 
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
          "status": "In Progress",
          "submission_method": "Method 1",
          "submitted_date": "2017-04-07, 09:32 PM",
          "due_date": "2017-01-12, 11:51 PM",
          "group": "Group 2"
      },
          {
          "job_id": "0005",
          "job_name": "Job 4",
          "status": "In Progress",
          "submission_method": "Method 3",
          "submitted_date": "2017-02-07, 04:14 PM",
          "due_date": "2017-02-12, 03:59 AM",
          "group": "Group 3"
      },
          {
          "job_id": "0005",
          "job_name": "Job 1",
          "status": "Delivered",
          "submission_method": "Method 1",
          "submitted_date": "2017-03-15, 08:26 PM",
          "due_date": "2017-03-26, 11:53 AM",
          "group": "Group 3"
      },
          {
          "job_id": "0004",
          "job_name": "Job 4",
          "status": "Printed",
          "submission_method": "Method 2",
          "submitted_date": "2017-02-20, 01:05 PM",
          "due_date": "2017-07-22, 09:57 PM",
          "group": "Group 1"
      },
          {
          "job_id": "0003",
          "job_name": "Job 3",
          "status": "Received",
          "submission_method": "Method 3",
          "submitted_date": "2016-12-21, 05:10 PM",
          "due_date": "2017-06-04, 05:17 PM",
          "group": "Group 4"
      },
          {
          "job_id": "0004",
          "job_name": "Job 3",
          "status": "Yet to start",
          "submission_method": "Method 1",
          "submitted_date": "2017-02-19, 11:31 PM",
          "due_date": "2017-04-01, 05:29 AM",
          "group": "Group 2"
      },
          {
          "job_id": "0004",
          "job_name": "Job 1",
          "status": "In Progress",
          "submission_method": "Method 2",
          "submitted_date": "2017-07-12, 06:06 PM",
          "due_date": "2017-03-26, 10:27 AM",
          "group": "Group 4"
      },
          {
          "job_id": "0005",
          "job_name": "Job 1",
          "status": "In Progress",
          "submission_method": "Method 3",
          "submitted_date": "2016-06-02, 06:07 AM",
          "due_date": "2017-03-06, 11:37 PM",
          "group": "Group 2"
      },
          {
          "job_id": "0005",
          "job_name": "Job 4",
          "status": "Delivered",
          "submission_method": "Method 1",
          "submitted_date": "2017-03-18, 09:06 AM",
          "due_date": "2017-04-26, 12:43 PM",
          "group": "Group 2"
      },
          {
          "job_id": "0003",
          "job_name": "Job 1",
          "status": "Received",
          "submission_method": "Method 3",
          "submitted_date": "2016-03-16, 09:27 AM",
          "due_date": "2017-04-10, 01:21 PM",
          "group": "Group 1"
      },
          {
          "job_id": "0004",
          "job_name": "Job 3",
          "status": "Yet to start",
          "submission_method": "Method 2",
          "submitted_date": "2016-06-14, 06:11 PM",
          "due_date": "2017-08-16, 09:13 PM",
          "group": "Group 1"
      },
          {
          "job_id": "0003",
          "job_name": "Job 1",
          "status": "Yet to start",
          "submission_method": "Method 2",
          "submitted_date": "2016-04-01, 02:40 PM",
          "due_date": "2017-06-30, 10:33 AM",
          "group": "Group 2"
      },
          {
          "job_id": "0006",
          "job_name": "Job 2",
          "status": "Received",
          "submission_method": "Method 2",
          "submitted_date": "2017-03-15, 07:07 AM",
          "due_date": "2017-07-01, 07:59 PM",
          "group": "Group 2"
      },
          {
          "job_id": "0005",
          "job_name": "Job 5",
          "status": "Yet to start",
          "submission_method": "Method 1",
          "submitted_date": "2016-07-31, 07:15 PM",
          "due_date": "2017-03-02, 09:37 AM",
          "group": "Group 4"
      },
          {
          "job_id": "0007",
          "job_name": "Job 2",
          "status": "In Progress",
          "submission_method": "Method 2",
          "submitted_date": "2016-12-03, 07:46 AM",
          "due_date": "2017-05-30, 06:43 AM",
          "group": "Group 1"
      },
          {
          "job_id": "0003",
          "job_name": "Job 5",
          "status": "Printed",
          "submission_method": "Method 1",
          "submitted_date": "2017-05-26, 05:48 AM",
          "due_date": "2017-03-09, 12:59 PM",
          "group": "Group 4"
      },
          {
          "job_id": "0002",
          "job_name": "Job 6",
          "status": "Received",
          "submission_method": "Method 1",
          "submitted_date": "2016-11-09, 01:23 PM",
          "due_date": "2017-07-09, 05:51 PM",
          "group": "Group 4"
      },
          {
          "job_id": "0005",
          "job_name": "Job 2",
          "status": "Yet to start",
          "submission_method": "Method 2",
          "submitted_date": "2016-01-04, 08:07 PM",
          "due_date": "2017-03-30, 02:25 AM",
          "group": "Group 4"
      },
          {
          "job_id": "0002",
          "job_name": "Job 4",
          "status": "Delivered",
          "submission_method": "Method 3",
          "submitted_date": "2016-07-13, 11:56 PM",
          "due_date": "2017-07-27, 08:46 PM",
          "group": "Group 2"
      },
          {
          "job_id": "0003",
          "job_name": "Job 3",
          "status": "Printed",
          "submission_method": "Method 2",
          "submitted_date": "2017-07-09, 05:55 PM",
          "due_date": "2017-03-03, 07:43 PM",
          "group": "Group 1"
      },
          {
          "job_id": "0004",
          "job_name": "Job 2",
          "status": "Received",
          "submission_method": "Method 1",
          "submitted_date": "2016-07-24, 11:05 PM",
          "due_date": "2017-03-27, 07:34 AM",
          "group": "Group 1"
      },
          {
          "job_id": "0005",
          "job_name": "Job 6",
          "status": "Printed",
          "submission_method": "Method 3",
          "submitted_date": "2016-06-01, 11:41 AM",
          "due_date": "2017-06-11, 12:13 PM",
          "group": "Group 1"
      },
          {
          "job_id": "0003",
          "job_name": "Job 3",
          "status": "In Progress",
          "submission_method": "Method 3",
          "submitted_date": "2016-01-22, 04:47 PM",
          "due_date": "2017-03-18, 07:12 PM",
          "group": "Group 2"
      },
          {
          "job_id": "0005",
          "job_name": "Job 4",
          "status": "Delivered",
          "submission_method": "Method 3",
          "submitted_date": "2017-03-20, 12:17 AM",
          "due_date": "2017-06-28, 06:52 PM",
          "group": "Group 4"
      },
          {
          "job_id": "0007",
          "job_name": "Job 4",
          "status": "In Progress",
          "submission_method": "Method 2",
          "submitted_date": "2016-08-23, 02:13 AM",
          "due_date": "2017-05-30, 03:34 PM",
          "group": "Group 1"
      },
          {
          "job_id": "0003",
          "job_name": "Job 3",
          "status": "Printed",
          "submission_method": "Method 2",
          "submitted_date": "2016-08-27, 07:20 AM",
          "due_date": "2017-03-05, 03:58 AM",
          "group": "Group 1"
      },
          {
          "job_id": "0007",
          "job_name": "Job 1",
          "status": "Yet to start",
          "submission_method": "Method 1",
          "submitted_date": "2016-10-03, 01:16 AM",
          "due_date": "2017-05-03, 05:21 AM",
          "group": "Group 3"
      },
          {
          "job_id": "0007",
          "job_name": "Job 1",
          "status": "Yet to start",
          "submission_method": "Method 2",
          "submitted_date": "2016-02-15, 11:18 AM",
          "due_date": "2017-08-13, 03:54 AM",
          "group": "Group 4"
      },
          {
          "job_id": "0006",
          "job_name": "Job 2",
          "status": "In Progress",
          "submission_method": "Method 3",
          "submitted_date": "2017-03-14, 06:01 PM",
          "due_date": "2017-07-13, 02:57 AM",
          "group": "Group 2"
      },
          {
          "job_id": "0002",
          "job_name": "Job 5",
          "status": "In Progress",
          "submission_method": "Method 3",
          "submitted_date": "2016-02-18, 02:15 PM",
          "due_date": "2017-07-31, 03:43 PM",
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

  ngOnDestroy() {
    this.dtCtrl.destroy();
  }
  
}

