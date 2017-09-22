import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Subject } from 'rxjs/Rx';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesController } from '../../../shared/controllers/data-tables.controller';
import { SweetAlertController } from '../../../shared/controllers/sweet-alert.controller';
import { AddEditVendorSetupComponent } from './add-edit-vendor-setup/add-edit-vendor-setup.component';
import { Vendor } from '../../../../model/vendor.model';
import { HttpService } from '../../../../service/http.service';
import { UrlDetails } from '../../../../model/url/url-details.model';
import { ToastController } from '../../../../modules/shared/controllers/toast.controller';

declare var $;

@Component({
  selector: 'app-vendor-setup',
  templateUrl: './vendor-setup.component.html',
  styleUrls: ['./vendor-setup.component.scss']
})

export class VendorSetupComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    dtOptions: any = {};

    records: Array<Vendor> = [];    

    dtCtrl: any = null;

    dialogOptions: any = {
        width: '800px',
        height: '550px',
        panelClass: 'appModalPopup'
    };

    dtTrigger: Subject<any> = new Subject();


    constructor(public dialog: MdDialog, private _router: Router, private httpService : HttpService,
    private toaster : ToastController) {        
        
    }

    ngOnInit() {
        this.dtCtrl = new DataTablesController({
            aoColumnDefs: [
                { 
                    bSortable: false,                     
                    aTargets: [3]
                }
            ]
        });
        this.dtOptions = this.dtCtrl.dataTableOptions;        
        this.getVendors();
    }

    getVendors(){
        this.httpService.getAll(UrlDetails.$getVendorsUrl).subscribe(response =>{
            if (response.responseCode==200) {
                this.records = response.responseData;
            } 
            else if (response.responseCode==204) {
                this.records = [];
            }                
            this.dtTrigger.next();
            this.dtCtrl.commonDTInit(this.dtElement);
        }, (error) => {
            this.dtTrigger.next();
            this.dtCtrl.commonDTInit(this.dtElement);
        });
    }

    addVendorPopup() {
        let addVendorDialogRef = this.dialog.open(AddEditVendorSetupComponent, this.dialogOptions);
        addVendorDialogRef.componentInstance.heading = 'Add Vendor';
        addVendorDialogRef.componentInstance.saveBtnTitle = 'Add';
        addVendorDialogRef.afterClosed().subscribe((result) => {
            if (typeof result !== 'undefined') {
                this.dtCtrl.reinit();
                this.getVendors();
            }
        });
    }

    editVendorPopup(vendor) {
        let editVendorDialogRef = this.dialog.open(AddEditVendorSetupComponent, this.dialogOptions);
        editVendorDialogRef.componentInstance.heading = 'Edit Vendor';
        editVendorDialogRef.componentInstance.saveBtnTitle = 'Save';
        editVendorDialogRef.componentInstance.setEditFormValues({
            vendorCode: vendor.code,
            vendorName: vendor.name,
            address: vendor.address,
            city: vendor.city,
            state: vendor.state,
            country: vendor.country,
            zipCode: vendor.zipcode,
            primaryContactPerson: vendor.contactPerson,
            phoneNumber: vendor.phoneNumber,
            fax: vendor.fax,
            email: vendor.emailId,
            vendorId : vendor.vendorId,
            logo : vendor.logo
        });
        editVendorDialogRef.afterClosed().subscribe((result) => {
            if (typeof result !== 'undefined') {
                this.dtCtrl.reinit();
                this.getVendors();
            }
        });
    }

    deleteVendor(record) {
        let deleteVendorSetupAlert = new SweetAlertController();
        deleteVendorSetupAlert.deleteConfirm({}, ()=> {
            console.log('id '+record.id);

            this.httpService.delete(UrlDetails.$deleteVendorUrl,record).subscribe(response => {
                if(response.responseCode==200)
                {
                    this.toaster.successToast("Vendor deleted successfully!");
                    this.dtCtrl.reinit();
                    this.getVendors();
                }
                else if(response.responseCode==204){
                    this.toaster.errorToast("Vendor delete failed!");
                }
            });
        });
    }

    ngOnDestroy() {
        this.dtCtrl.destroy();
    }

}