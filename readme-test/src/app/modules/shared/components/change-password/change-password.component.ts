import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastController } from '../../controllers/toast.controller';
import { MdDialogRef } from '@angular/material';
import { HttpService } from '../../../../service/http.service';
import { UrlDetails } from '../../../../model/url/url-details.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {

    changePasswordForm: FormGroup;

    changePasswordRequest = new ChangePasswordRequest();

    wait: boolean = false;

    constructor(private _fb: FormBuilder, public _dialogRef: MdDialogRef<ChangePasswordComponent>, public toastCtrl: ToastController,
    private httpService : HttpService) {
        this.changePasswordForm = this._fb.group({
            currentPassword: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required]),
            confirmNewPassword: new FormControl('', [Validators.required])
        }, {
            validator: this.matchConfirmPassword
        });
    }

    matchConfirmPassword(AC: AbstractControl) {
        let password = AC.get('newPassword').value; 
        let confirmPassword = AC.get('confirmNewPassword').value;
        if (password != '' && confirmPassword !== '' && password !== confirmPassword) {
            AC.get('confirmNewPassword').setErrors({ 
                MatchPassword: true
            })
        } else {
            return null
        }
    }

    ngOnInit() {
      $('.change-password-wrap').closest('.cdk-overlay-pane').addClass('changePasswordPopup');
    }

    updatePassword({value, valid}: {value: any, valid: boolean}) {        
        if (!valid) {
            this.changePasswordForm.markAsDirty();
        } else {            
            this.changePasswordForm.markAsPristine();
            console.log(value);

            this.changePasswordRequest.oldPassword = value.currentPassword;
            this.changePasswordRequest.newPassword = value.newPassword;
            this.changePasswordRequest.userName = localStorage.getItem("userName");

            this.httpService.save(UrlDetails.$changePasswordUrl,this.changePasswordRequest)
            .subscribe(response=>{
                if(response.responseCode==200)
                {
                    this.toastCtrl.successToast("Password changed successfully!");
                    this._dialogRef.close();
                }
                else if(response.responseCode==204)
                {
                    this.toastCtrl.errorToast("Wrong old password");
                }
                else if(response.responseCode==400)
                {
                    this.toastCtrl.errorToast(response.responseMessage);
                }
            },error=>{

            });
        }        
    }

    closePopup() {
        this._dialogRef.close();
    }

}

class ChangePasswordRequest{
    userName : string;
	oldPassword : string;
	newPassword : string;

    constructor(){
    this.userName = '';
	this.oldPassword = '';
	this.newPassword = '';
    }
}
