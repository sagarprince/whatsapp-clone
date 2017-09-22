import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MdDialogRef } from '@angular/material';
import { HttpService } from '../../../../../service/http.service';
import { UrlDetails } from '../../../../../model/url/url-details.model';
import { ToastController } from './../../../../../modules/shared/controllers/toast.controller';

@Component({
  selector: 'app-add-group-user',
  templateUrl: './add-group-user.component.html',
  styleUrls: ['./add-group-user.component.scss']
})

export class AddGroupUserComponent implements OnInit {

    @Input('userType') userType = '';

    @Input('heading') heading = 'Add User';

    @Input('saveButtonTitle') saveBtnTitle = 'Add';

    activeTab: number = 1;

    addUserForm: FormGroup;    

    usernameMethod: any = 1;

    constructor(private _fb: FormBuilder, public _dialogRef: MdDialogRef<AddGroupUserComponent> , public httpService : HttpService , public urlDetails : UrlDetails , public toastController : ToastController) { 
        this.addUserForm = this._fb.group({
                users : new FormControl('', [Validators.required])              
        });
    }
    
    ngOnInit(): void{        
        if (this.userType === 'manager') {
            this.heading = 'Add Manager';
        }
    }

    selectTab(tab: number) {
        this.activeTab = tab;
    }

    byUserEmail(id: number) {
        this.addUserForm.controls['users'].setValue('');        
        if (id === 1) {
            this.addUserForm.controls['users'].setValidators([Validators.required]);
        } else {
            const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            this.addUserForm.controls['users'].setValidators([Validators.required, Validators.pattern(EMAIL_REGEX)]);
        }

        this.addUserForm.controls['users'].updateValueAndValidity();
    }

    saveUser({value, valid}: {value: any, valid: boolean}) {
        if (!valid) {
            this.addUserForm.markAsDirty();
        } else {
          this.addUserForm.markAsPristine();
          let userRoleCode  = ''
          if(this.userType === 'user'){ userRoleCode  = 'USER'}else { userRoleCode  = 'CLIENT_MANAGER'}
          let request = {
             request : value.users,
             userRoleCode : userRoleCode
         };
             if(this.usernameMethod === 1){
                     this.getUserByUserName(request);
             }else{
                    this.getUserByEmailId(request);
             }                       
        }
    }

    closePopup() {
        this._dialogRef.close();
    }

    getUserByUserName (request : any){
         this.httpService.findById(UrlDetails.$getUserByUserNameAndRoleUrl ,request)
         .subscribe(response => {
             let result = [];
              if(response.responseCode === 200){
                    this.toastController.successToast(this.userType + " with given username added successfully");
                     result.push(response.responseData);
             }else{
                 this.toastController.errorToast(this.userType + " with given username not found");
              }
              this._dialogRef.close(result);
         });
    }

    getUserByEmailId (request : any){
        this.httpService.findById(UrlDetails.$getUserByEmailIdAndRoleUrl,request)
        .subscribe(response => {
            let result = [];
            if(response.responseCode === 200){
                this.toastController.successToast(this.userType + " with given email id added successfully");
                result.push(response.responseData);
            }else{
                this.toastController.errorToast(this.userType + " with given email id not found");
             }
             this._dialogRef.close(result);
        });
    }


    importUsers() {
        console.log('import users functionality');
    }

}
