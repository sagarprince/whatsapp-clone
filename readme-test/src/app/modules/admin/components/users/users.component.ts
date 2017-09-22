import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesController } from '../../../shared/controllers/data-tables.controller';
import { Subject } from 'rxjs/Rx';
import { SweetAlertController } from '../../../shared/controllers/sweet-alert.controller';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { HttpService } from '../../../../service/http.service';
import { UrlDetails } from '../../../../model/url/url-details.model';
import { User } from '../../../../model/user.model';
import { ToastController } from '../../../shared/controllers/toast.controller';

declare var $;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    dtOptions: any = {};

    records: Array<User> = [];    

    dtCtrl: any = null;

    dialogOptions: any = {
        width: '510px',
        height: '420px',
        panelClass: 'appModalPopup'          
    };

    dtTrigger: Subject<any> = new Subject();

    constructor(public dialog: MdDialog,
    private httpService : HttpService,
    private toaster : ToastController) {        
    }

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
        this.getAllUsers();       
    }

    getAllUsers(){
        this.httpService.getAll(UrlDetails.$getAllUsersUrl).subscribe(response =>{
            if(response.responseCode==200)
            {
                this.records = response.responseData;
            }
            else if(response.responseCode==204)
            {
                this.records = [];
            }
            this.dtTrigger.next();
            this.dtCtrl.commonDTInit(this.dtElement);
        }, (error) => {
            this.dtTrigger.next();
            this.dtCtrl.commonDTInit(this.dtElement);
        });
    }

    addUserPopup() {
        let addUserDialogRef = this.dialog.open(AddEditUserComponent, this.dialogOptions);
        addUserDialogRef.componentInstance.heading = 'Add User';
        addUserDialogRef.componentInstance.saveBtnTitle = 'Add';
        addUserDialogRef.afterClosed().subscribe(result=>{
            if (typeof result !== 'undefined') {      
                this.dtCtrl.reinit();      
                this.getAllUsers();
            }
        });
    }

    editUserPopup(user) {

        let groups = [];

        user.groups.forEach(element => {
            groups.push(element.groupId);
        });

        let editUserDialogRef = this.dialog.open(AddEditUserComponent, this.dialogOptions);
        editUserDialogRef.componentInstance.heading = 'Edit User';
        editUserDialogRef.componentInstance.saveBtnTitle = 'Save';
        editUserDialogRef.componentInstance.setEditFormValues({
            userName: user.userName,
            email: user.emailId,
            contactNumber: user.contactNumber,
            group: groups,
            firstName : user.firstName,
            lastName : user.lastName,
            userId : user.userId
        });
        editUserDialogRef.afterClosed().subscribe(result=>{
            if (typeof result !== 'undefined') {      
                this.dtCtrl.reinit();      
                this.getAllUsers();
            }
        });
    }

    deleteUser(user) {
        let deleteUserConfirmAlert = new SweetAlertController();
        deleteUserConfirmAlert.deleteConfirm({}, ()=> {
            console.log('yes');

            this.httpService.save(UrlDetails.$deleteUserUrl,user)
            .subscribe(response=>{
                if(response.responseCode==200)
                {
                    this.toaster.successToast("User deleted successfully!");
                    this.dtCtrl.reinit();
                    this.getAllUsers();
                }
                else if(response.responseCode==204 || response.responseCode==400)
                {
                    this.toaster.errorToast(response.responseMessage);
                }

            },error=>{

            });
        });
    }

    ngOnDestroy() {
        this.dtCtrl.destroy();
    }

}