import { Component, OnInit, OnDestroy, ViewChild ,Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Subject } from 'rxjs/Rx';

import { DataTableDirective } from 'angular-datatables';

import { DataTablesController } from '../../../shared/controllers/data-tables.controller';

import { SweetAlertController } from '../../../shared/controllers/sweet-alert.controller';

import { AddEditFacilitiesComponent } from './add-edit-facilities/add-edit-facilities.component';

import { UploadListComponent } from './upload-list/upload-list.component';

import { FacilityGroupsComponent } from './facilitygroups/facilitygroups.component';
import { UrlDetails } from '../../../../model/url/url-details.model';
import { HttpService } from '../../../../service/http.service';
import { ToastController } from '../../../shared/controllers/toast.controller';

declare var $;

@Component({
    selector: 'app-facilities',
    templateUrl: './facilities.component.html',
    styleUrls: ['./facilities.component.scss']
})

export class FacilitiesComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    dtOptions: any = {};

    records: Array<any> = [];

    dtCtrl: any = null;

    dtTrigger: Subject<any> = new Subject();

    dialogOptions: any = {
        width: '510px',
        height: '670px',
        panelClass: 'appModalPopup'
    };

    constructor(public dialog: MdDialog, private _router: Router, public httpService: HttpService, public toastController:ToastController) {
        
    }


    getAllFacilities() {
      
        this.httpService.getAll(UrlDetails.$facilityGetUrl)
            .subscribe(response => {
                 this.records = response.responseData;
                 this.dtTrigger.next();
                 this.dtCtrl.commonDTInit(this.dtElement);
            }, (error) => {
            this.dtTrigger.next();
            this.dtCtrl.commonDTInit(this.dtElement);
        });
    } //getAllFacilities

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
        this.getAllFacilities();      
    }

    addFacilityPopup() {
        let addFacilityDialogRef = this.dialog.open(AddEditFacilitiesComponent, this.dialogOptions);
        addFacilityDialogRef.componentInstance.heading = 'Add Facility';
        addFacilityDialogRef.componentInstance.saveBtnTitle = 'Add';
        addFacilityDialogRef.componentInstance.mode = 'add';
        addFacilityDialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.dtCtrl.reinit();
                this.getAllFacilities();
            }
        });
    }

    editFacilityPopup(facilityDetails) {
        
        let editFacilityDialogRef = this.dialog.open(AddEditFacilitiesComponent, this.dialogOptions);
        editFacilityDialogRef.componentInstance.heading = 'Edit Facility';
        editFacilityDialogRef.componentInstance.saveBtnTitle = 'Save';
        editFacilityDialogRef.componentInstance.mode = 'edit';
        editFacilityDialogRef.componentInstance.setEditFormValues(facilityDetails);
        editFacilityDialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.dtCtrl.reinit();
                this.getAllFacilities();
            }
        });
    }

    uploadListPopup() {
        let dialogRef = this.dialog.open(UploadListComponent, {
            height: '308px',
            width: '462px',
            panelClass: 'appModalPopup'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.dtCtrl.reinit();
                this.getAllFacilities();
            }
        });
    }

    deleteFacility(facilityID:String) {
        let facility={ facilityId : facilityID}
        
        let deleteFacilityConfirmAlert = new SweetAlertController();
        deleteFacilityConfirmAlert.deleteConfirm({}, () => {
            this.httpService.delete(UrlDetails.$removeFacilityUrl,facility)
            .subscribe(response => {
              if(response.responseData) {                 
                this.toastController.successToast("Record deleted Successfully");
                this.dtCtrl.reinit();
                this.getAllFacilities();
              } else {
                this.toastController.errorToast("Selected Record is already deleted");
              }               
            }, error => {                
                this.toastController.errorToast("Something went wrong, Please try again.");
                this.dtTrigger.next();
                this.dtCtrl.commonDTInit(this.dtElement);     
              });
        });
    }

    ngOnDestroy() {
        this.dtCtrl.destroy();
    }

}