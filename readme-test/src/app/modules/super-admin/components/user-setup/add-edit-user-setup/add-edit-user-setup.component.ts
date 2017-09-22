import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { ToastController } from '../../../../shared/controllers/toast.controller';
import { Pattern } from '../../../../../model/util/pattern.model';

@Component({
  selector: 'app-add-edit-user-setup',
  templateUrl: './add-edit-user-setup.component.html',
  styleUrls: ['./add-edit-user-setup.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddEditUserSetupComponent implements OnInit {

    @Input('heading') heading = 'Add User';

    @Input('saveButtonTitle') saveBtnTitle = 'Add';

    addEditUserSetupForm: FormGroup;

    userTypes = [
        {value: 'test-1', text: 'Test 1'},
        {value: 'test-2', text: 'Test 2'},
        {value: 'test-3', text: 'Test 3'}
    ];

    skillTypes = [
        {value: 'test-1', text: 'Training'},
        {value: 'test-2', text: 'Test 2'},
        {value: 'test-3', text: 'Test 3'}
    ];

    clients = [
        {value: 'test-1', text: 'BOA1'},
        {value: 'test-2', text: 'BOA2'},
        {value: 'test-3', text: 'BOA3'}
    ];

    assignQueues = [
        {value: 'test-1', text: 'Test 1'},
        {value: 'test-2', text: 'Test 2'},
        {value: 'test-3', text: 'Test 3'}
    ];

    constructor(private _fb: FormBuilder, 
    public _dialogRef: MdDialogRef<AddEditUserSetupComponent>,
    public _toastCtrl: ToastController) {
        const EMAIL_REGEX = Pattern.emailPattern;
        const NUMBER_REGEX = Pattern.onlyNumberPattern;

        this.addEditUserSetupForm = this._fb.group({
            userName: new FormControl('', [Validators.required]),          
            loginName: new FormControl('', [Validators.required]),          
            userType: new FormControl(''),
            skillType: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),  
            phoneNumber: new FormControl('',  [Validators.required]),
            client: new FormControl(''),
            loginAttempts: new FormControl('', [Validators.pattern(NUMBER_REGEX)]),
            passwordExpired: new FormControl('', [Validators.pattern(NUMBER_REGEX)]),
            mustChangePassword: new FormControl(false),
            resetPassword: new FormControl(false),
            isAdmin: new FormControl(false),
            allowEmail: new FormControl(false),
            assignQueue: new FormControl('') 
        });
    }
    
    ngOnInit(): void{        
        
    }

    saveUserSetup({value, valid}: {value: any, valid: boolean}) {        
        console.log(value);
        if (!valid) {
            this.addEditUserSetupForm.markAsDirty();
        } else {
            this.addEditUserSetupForm.markAsPristine();
            this._dialogRef.close();        
            this._toastCtrl.successToast('Added Successfully !');
        }
    }

    setEditFormValues(details?: any) {        
        this.addEditUserSetupForm.patchValue(details);
    }

    closePopup() {
        this._dialogRef.close();
    }

}
