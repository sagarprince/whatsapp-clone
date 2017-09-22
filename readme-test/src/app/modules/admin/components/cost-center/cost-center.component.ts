import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Subject } from 'rxjs/Rx';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesController } from '../../../shared/controllers/data-tables.controller';
import { SweetAlertController } from '../../../shared/controllers/sweet-alert.controller';
import { AddEditCostCenterComponent } from './add-edit-cost-center/add-edit-cost-center.component';
import { HttpService } from '../../../../service/http.service';
import { UrlDetails } from '../../../../model/url/url-details.model';
import { ToastController } from '../../../shared/controllers/toast.controller';

declare var $;

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss']
})

export class CostCenterComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    dtOptions: any = {};

    dtTrigger: Subject<any> = new Subject();

    records: Array<any> = [];    

    dtCtrl: any = null;

    dialogOptions: any = {
        width: '510px',
        height: '260px',
        panelClass: 'appModalPopup'          
    };

    constructor(public dialog: MdDialog,public httpService: HttpService,public toastController: ToastController) {
        
    }

   loadAllCostCenters (){
       this.httpService.findById(UrlDetails.$getAllCostCenterResponseUrl,{}).subscribe((response) => {
           this.records = response.responseData;
           this.dtTrigger.next();
           this.dtCtrl.commonDTInit(this.dtElement); 
       },(error) => {
          this.dtTrigger.next();
           this.dtCtrl.commonDTInit(this.dtElement); 
       });
   }

    ngOnInit() {
        this.dtCtrl = new DataTablesController({
            aoColumnDefs: [
                { 
                    bSortable: false,                     
                    aTargets: [6]
                }
            ]
        });
        this.dtOptions = this.dtCtrl.dataTableOptions;        
        this.loadAllCostCenters();        
    }

    addCostCenterPopup() {
        let addCostCenterDialogRef = this.dialog.open(AddEditCostCenterComponent, this.dialogOptions);
        addCostCenterDialogRef.componentInstance.heading = 'Add Cost Center';
        addCostCenterDialogRef.componentInstance.saveBtnTitle = 'Add';
        addCostCenterDialogRef.componentInstance.mode = 'add'
        addCostCenterDialogRef.afterClosed().subscribe((result) => {
            if (typeof result !== 'undefined') {
                this.dtCtrl.reinit();
                this.loadAllCostCenters();
            }
        });
    }

    editCostCenterPopup(costCenterId) {
        let editCostCenterDialogRef = this.dialog.open(AddEditCostCenterComponent, this.dialogOptions);
        editCostCenterDialogRef.componentInstance.heading = 'Edit Cost Center';
        editCostCenterDialogRef.componentInstance.saveBtnTitle = 'Save';
        editCostCenterDialogRef.componentInstance.mode = 'edit'
        this.httpService.findById(UrlDetails.$getCostCenterByIdUrl ,{costCenterId : costCenterId}).subscribe((response) =>{
              let costCenter : any;
              let groups = [];
              if(response.responseCode === 200){
                  costCenter = response.responseData;
                  costCenter.groups.forEach(group => {
                      groups.push(group.groupId);
                  });
                  costCenter.groups = groups;
              }
              editCostCenterDialogRef.componentInstance.addEditCostCenterForm.patchValue(costCenter);
        }, (error) =>{
              console.log(error);
        })
        editCostCenterDialogRef.afterClosed().subscribe((result) => {
            if (typeof result !== 'undefined') {
                this.dtCtrl.reinit();
                this.loadAllCostCenters();
            }
        });
    }

    deleteCostCenter(costCenter) {
        let deleteCostCenterConfirmAlert = new SweetAlertController();
        deleteCostCenterConfirmAlert.deleteConfirm({}, ()=> {
            this.httpService.delete(UrlDetails.$removeCostCenterUrl,{ costCenterId :  costCenter.costCenterId}).subscribe((response) =>{
                    if(response.responseData === true){
                        this.toastController.successToast('Cost center '+costCenter.costCenterName+' deleted successfully');
                        this.dtCtrl.reinit();
                        this.loadAllCostCenters();
                 }else{
                        this.toastController.errorToast('Cost center '+costCenter.costCenterName+' deletion failed');
                    }
            } , (error) => {
                 this.toastController.errorToast('Exception while deleting cost center '+costCenter.costCenterName+', Please try after some time');
            })
        });
    }

    ngOnDestroy() {
        this.dtCtrl.destroy();
    }

    getAllGroups() {
        this.httpService.getAll(UrlDetails.$getAllGroupsResponseUrl)
            .subscribe(response => {   
                console.log('Group response');
                let groups = response.responseData;            
            }, (error) => {      
        });
    }
}