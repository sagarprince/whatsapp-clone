import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Subject } from 'rxjs/Rx';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesController } from '../../../../shared/controllers/data-tables.controller';
import {HttpService} from '../../../../../service/http.service';
import {UrlDetails } from '../../../../../model/url/url-details.model';
import { ToastController } from '../../../../shared/controllers/toast.controller';
import { SweetAlertController } from '../../../../shared/controllers/sweet-alert.controller';
declare var $;

@Component({
  selector: 'app-facilitygroups',
  templateUrl: './facilitygroups.component.html',
  styleUrls: ['./facilitygroups.component.scss']
})

export class FacilityGroupsComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    dtOptions: any = {};

    records: Array<any> = [];    
    facility: Array<any> = []; 
    dtCtrl: any = null;

    dtTrigger: Subject<any> = new Subject();
  
    constructor(public dialog: MdDialog, private _route: ActivatedRoute, private _router: Router, public httpService:HttpService,public toastController:ToastController) {        
        
    }

    getGroupsByFacilityId() {
        this._route.params.subscribe((param: any) => {
            let facility = { facilityId : param.fid };                        
            this.httpService.findById(UrlDetails.$getGroupListByFacilityIdUrl,facility).subscribe( response =>{
                this.records=response.responseData; 
                this.dtTrigger.next();
                this.dtCtrl.commonDTInit(this.dtElement);

            });  
          let facility1 = { facilityId : param.fid }; 
            this.httpService.findById(UrlDetails.$getFacilityByIDUrl,facility1).subscribe( response =>{
                if(response.responseCode == "200") {
                    this.facility=response.responseData;
                }
                

            });              
        });

        
    }//getGroupsByFacilityId
    

   deleteGroup(goupId:string) {
        let deleteGroupConfirmAlert = new SweetAlertController();
        deleteGroupConfirmAlert.deleteConfirm({}, ()=> {
            let deleteGroupRequest = {
                groupId : goupId
            }
            this.httpService.remove(UrlDetails.$removeGroupUrl,deleteGroupRequest).subscribe(response =>{
                 if(response.responseCode === 200){
                     if(response.responseData === true){
                        this.toastController.successToast("Group deleted successfully");
                        this.dtCtrl.reinit();
                        this.getGroupsByFacilityId();
                      
                      } else{
                        this.toastController.successToast("Group deletion failed");
                      }
                 }
            });
        });
    }//deleteGroup

    ngOnInit() {
        this.dtCtrl = new DataTablesController({
            aoColumnDefs: [
                { 
                    bSortable: false,                     
                    aTargets: [4]
                }
            ]
        });
        this.dtOptions = this.dtCtrl.dataTableOptions;

        this.getGroupsByFacilityId();
    }

   
    gotoAddGroups() {
        this._router.navigate(['admin/groups/add']);
    }

    gotoGroupEdit(id: any) {        
        this._router.navigate(['admin/groups/edit/' + id]);
    }

    ngOnDestroy() {
        this.dtCtrl.destroy();
    }
    
}//FacilityGroupsComponent