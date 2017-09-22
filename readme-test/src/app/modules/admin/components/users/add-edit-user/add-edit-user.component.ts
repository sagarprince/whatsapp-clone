import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../../service/http.service';
import { UrlDetails } from '../../../../../model/url/url-details.model';
import { ToastController } from '../../../../shared/controllers/toast.controller';
import { FileUploadController } from '../../../../shared/controllers/file-uploader.controller';
import { MdDialogRef } from '@angular/material';
import { User } from '../../../../../model/user.model';
import { Group } from '../../../../../model/group.model';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})

export class AddEditUserComponent implements OnInit {

    @Input('heading') heading = 'Add User';

    @Input('saveButtonTitle') saveBtnTitle = 'Add';

    fileContent : string = '';
    
    activeTab: number = 1;

    addEditUserForm: FormGroup;    

    groups: Array<Group> = [];

    user : User;

    editDetails: any = {};

    constructor(private _fb: FormBuilder, public _dialogRef: MdDialogRef<AddEditUserComponent>,
                private httpService : HttpService,
                private toaster : ToastController,
                private fileUploadCtrl : FileUploadController) { 
        const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        this.addEditUserForm = this._fb.group({
            userName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            contactNumber: new FormControl(''),
            group: new FormControl(''),
            userId : ''          
        });
    }
    
    ngOnInit(): void{        
        this.getAllGroups();
    }

    selectTab(tab: number) {
        this.activeTab = tab;
    }

    saveUser({value, valid}: {value: any, valid: boolean}) {
        if (!valid) {
            this.addEditUserForm.markAsDirty();
        } else {
            this.addEditUserForm.markAsPristine();

            this.user = new User();
            this.user.contactNumber = value.contactNumber;
            this.user.emailId = value.email;
            this.user.firstName = value.firstName;
            this.user.lastName = value.lastName; 
            this.user.userName = value.userName;

            this.user.userType = {
                                    "userTypeCode" : "CLIENT",
                                    "USERTYPENAME" : "Client"
                                  };
            this.user.userRole = {
                                    "userRoleCode" : "USER",
                                    "ROLENAME" : "User"
                                 };

            let groups = [];

            if(value.group!="")
            {
                value.group.forEach(groupId => {
                    let group = {'groupId' : ''};
                    group.groupId = groupId;
                    groups[groups.length] = group;
                });
            }

            this.user.groups = groups;

            let url = '';

            if(value.userId=="")
            {
                url = UrlDetails.$saveUserUrl;
            }
            else
            {
                url = UrlDetails.$updateUserUrl;
                this.user.userId = value.userId;
            }

            this.httpService.save(url,this.user)
            .subscribe(response=>{
            if(response.responseCode==200)
            {
                this.toaster.successToast("User saved successfully!");
                this._dialogRef.close('save');
            }
            else if(response.responseCode==204 || response.responseCode==409)
            {
                this.toaster.errorToast(response.responseMessage);
            }
            },error=>{

            });
        }
    }

    setEditFormValues(details?: any) {   
        this.editDetails = details;     
    }

    bulkUpload() {
        this.httpService.save(UrlDetails.$uploadUsersUrl, this.fileContent)
        .subscribe(response =>{
            //console.log("response: "+response);
            if(response.responseCode==200)
            {
                this.toaster.successToast("Users added successfully");
                this._dialogRef.close('save');
            }
            else if(response.responseCode==409)
            {
                this.toaster.errorToast("One or more records not saved");
            }
        }, (error) => {

        });
    }

    getAllGroups(){
        this.httpService.getAll(UrlDetails.$getAllGroupsUrl)
        .subscribe(response=>{
            if(response.responseCode==200)
            {
                this.groups = response.responseData;
                this.addEditUserForm.patchValue(this.editDetails);
            }
        },error=>{

        });
    }
    

    fileChange(input) {
        this.fileUploadCtrl.readFile(input, (dataUrl) => {
            this.fileContent = dataUrl;
        });
    }

    closePopup() {
        this._dialogRef.close();
    }    

}
