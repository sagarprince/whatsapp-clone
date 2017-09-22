import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesController } from '../../../shared/controllers/data-tables.controller';
import { SweetAlertController } from '../../../shared/controllers/sweet-alert.controller';
import { UrlDetails } from '../../../../model/url/url-details.model';
import { HttpService } from '../../../../service/http.service';
import { ToastController } from '../../../shared/controllers/toast.controller';

declare var $;

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    dtOptions: any = {};

    records: Array<any> = [];    

    dtCtrl: any = null;

    dtTrigger: Subject<any> = new Subject();

    constructor(private _router: Router,public httpService: HttpService, public toastController: ToastController) {        
            
    }

    getAllGroups() {
        this.httpService.getAll(UrlDetails.$getAllGroupsResponseUrl)
            .subscribe(response => {   
                console.log('Group response');
                console.log(response);
                this.records = response.responseData;
                this.dtTrigger.next();
                this.dtCtrl.commonDTInit(this.dtElement);             
            }, (error) => {
                this.dtTrigger.next();
                this.dtCtrl.commonDTInit(this.dtElement);             
            });
    } //getAllGroups

    ngOnInit() {        
        this.dtCtrl = new DataTablesController({
            aoColumnDefs: [
                { 
                    bSortable: false,                     
                    aTargets: [4, 5]
                }
            ]
        });
        this.dtOptions = this.dtCtrl.dataTableOptions;            
        this.getAllGroups();  
    }

    gotoAddGroups() {
        this._router.navigate(['admin/groups/add']);
    }
    
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
                        this.getAllGroups();
                      } else{
                        this.toastController.successToast("Group deletion failed");
                      }
                 }
            }, (error) => {
                this.toastController.successToast("Exception while deleting group, please try after some time");
            });
        });
    }
  
    ngOnDestroy() {
        this.dtCtrl.destroy();
    }
     
}