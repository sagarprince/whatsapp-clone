import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Subject } from 'rxjs/Rx';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesController } from '../../../shared/controllers/data-tables.controller';
import { SweetAlertController } from '../../../shared/controllers/sweet-alert.controller';
import { AddEditQueueSetupComponent } from './add-edit-queue-setup/add-edit-queue-setup.component';

declare var $;

@Component({
  selector: 'app-queue-setup',
  templateUrl: './queue-setup.component.html',
  styleUrls: ['./queue-setup.component.scss']
})

export class QueueSetupComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    dtOptions: any = {};

    records: Array<any> = [];    

    dtCtrl: any = null;

    dialogOptions: any = {
        width: '500px',
        height: '320px',
        panelClass: 'appModalPopup'          
    };

    dtTrigger: Subject<any> = new Subject();

    constructor(public dialog: MdDialog, private _router: Router) {        
        
    }

    ngOnInit() {
        this.dtCtrl = new DataTablesController({
            aoColumnDefs: [
                { 
                    bSortable: false,                     
                    aTargets: [5]
                }
            ]
        });
        this.dtOptions = this.dtCtrl.dataTableOptions;        

        setTimeout(() => {
            this.records = [
                {
                    "queue_name": "Queue 13",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 9",
                    "next_queue": "Queue 1"
                },
                    {
                    "queue_name": "Queue 1",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 8",
                    "next_queue": "Queue 5"
                },
                    {
                    "queue_name": "Queue 10",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 8",
                    "next_queue": "Queue 4"
                },
                    {
                    "queue_name": "Queue 9",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 6",
                    "next_queue": "Queue 3"
                },
                    {
                    "queue_name": "Queue 8",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 1",
                    "next_queue": "Queue 3"
                },
                    {
                    "queue_name": "Queue 9",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 8",
                    "next_queue": "Queue 3"
                },
                    {
                    "queue_name": "Queue 2",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 8",
                    "next_queue": "Queue 2"
                },
                    {
                    "queue_name": "Queue 3",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 9",
                    "next_queue": "Queue 3"
                },
                    {
                    "queue_name": "Queue 10",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 3",
                    "next_queue": "Queue 1"
                },
                    {
                    "queue_name": "Queue 3",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 4",
                    "next_queue": "Queue 4"
                },
                    {
                    "queue_name": "Queue 11",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 6",
                    "next_queue": "Queue 4"
                },
                    {
                    "queue_name": "Queue 1",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 6",
                    "next_queue": "Queue 1"
                },
                    {
                    "queue_name": "Queue 12",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 4",
                    "next_queue": "Queue 3"
                },
                    {
                    "queue_name": "Queue 11",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 4",
                    "next_queue": "Queue 4"
                },
                    {
                    "queue_name": "Queue 11",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 7",
                    "next_queue": "Queue 2"
                },
                    {
                    "queue_name": "Queue 7",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 7",
                    "next_queue": "Queue 4"
                },
                    {
                    "queue_name": "Queue 1",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 8",
                    "next_queue": "Queue 5"
                },
                    {
                    "queue_name": "Queue 5",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 2",
                    "next_queue": "Queue 4"
                },
                    {
                    "queue_name": "Queue 6",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 4",
                    "next_queue": "Queue 2"
                },
                    {
                    "queue_name": "Queue 9",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 7",
                    "next_queue": "Queue 5"
                },
                    {
                    "queue_name": "Queue 9",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 6",
                    "next_queue": "Queue 4"
                },
                    {
                    "queue_name": "Queue 11",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 5",
                    "next_queue": "Queue 1"
                },
                    {
                    "queue_name": "Queue 13",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 10",
                    "next_queue": "Queue 1"
                },
                    {
                    "queue_name": "Queue 4",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 5",
                    "next_queue": "Queue 5"
                },
                    {
                    "queue_name": "Queue 9",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 9",
                    "next_queue": "Queue 3"
                },
                    {
                    "queue_name": "Queue 13",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 2",
                    "next_queue": "Queue 5"
                },
                    {
                    "queue_name": "Queue 12",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 6",
                    "next_queue": "Queue 1"
                },
                    {
                    "queue_name": "Queue 6",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 5",
                    "next_queue": "Queue 5"
                },
                    {
                    "queue_name": "Queue 6",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 3",
                    "next_queue": "Queue 4"
                },
                    {
                    "queue_name": "Queue 5",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 5",
                    "next_queue": "Queue 5"
                },
                    {
                    "queue_name": "Queue 4",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 2",
                    "next_queue": "Queue 5"
                },
                    {
                    "queue_name": "Queue 7",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 2",
                    "next_queue": "Queue 5"
                },
                    {
                    "queue_name": "Queue 13",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 6",
                    "next_queue": "Queue 5"
                },
                    {
                    "queue_name": "Queue 11",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 10",
                    "next_queue": "Queue 2"
                },
                    {
                    "queue_name": "Queue 10",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 2",
                    "next_queue": "Queue 1"
                },
                    {
                    "queue_name": "Queue 10",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 1",
                    "next_queue": "Queue 1"
                },
                    {
                    "queue_name": "Queue 6",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 1",
                    "next_queue": "Queue 5"
                },
                    {
                    "queue_name": "Queue 12",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 9",
                    "next_queue": "Queue 1"
                },
                    {
                    "queue_name": "Queue 3",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 10",
                    "next_queue": "Queue 2"
                },
                    {
                    "queue_name": "Queue 1",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 6",
                    "next_queue": "Queue 4"
                },
                    {
                    "queue_name": "Queue 13",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 4",
                    "next_queue": "Queue 1"
                },
                    {
                    "queue_name": "Queue 8",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 8",
                    "next_queue": "Queue 3"
                },
                    {
                    "queue_name": "Queue 2",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 2",
                    "next_queue": "Queue 4"
                },
                    {
                    "queue_name": "Queue 12",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 1",
                    "next_queue": "Queue 4"
                },
                    {
                    "queue_name": "Queue 10",
                    "queue_for": "Lorem Ipsum is simply dummy text of the printing and typesetting ",
                    "queue_type": "Normal",
                    "project": "Project 8",
                    "next_queue": "Queue 3"
                }
            ];
            this.dtTrigger.next();
            this.dtCtrl.commonDTInit(this.dtElement);
        }, 1000);
    }

    addQueuePopup() {
        let addQueueDialogRef = this.dialog.open(AddEditQueueSetupComponent, this.dialogOptions);
        addQueueDialogRef.componentInstance.heading = 'Add Queue';
        addQueueDialogRef.componentInstance.saveBtnTitle = 'Add';
        addQueueDialogRef.componentInstance.mode = 'add';
    }

    editQueuePopup(record) {
        let editQueueDialogRef = this.dialog.open(AddEditQueueSetupComponent, this.dialogOptions);
        editQueueDialogRef.componentInstance.heading = 'Edit Queue';
        editQueueDialogRef.componentInstance.saveBtnTitle = 'Save';
        editQueueDialogRef.componentInstance.mode = 'edit';
        editQueueDialogRef.componentInstance.setEditFormValues({
            queueName: record.queue_name,
            queueType: record.queue_type,
            queueFor: record.queue_for,
            project: record.project,
            nextQueue: record.next_queue
        });
    }

    deleteQueue() {
        let deleteQueueSetupAlert = new SweetAlertController();
        deleteQueueSetupAlert.deleteConfirm({}, ()=> {
            console.log('yes');
        });
    }

    ngOnDestroy() {
        this.dtCtrl.destroy();
    }  

}