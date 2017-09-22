import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { UrlDetails } from '../../../../../model/url/url-details.model';
import { HttpService } from '../../../../../service/http.service';
import { ToastController } from '../../../../shared/controllers/toast.controller';
import {Pattern} from './../../../../../model/util/pattern.model';

declare var $: any;

@Component({
  selector: 'app-add-edit-facilities',
  templateUrl: './add-edit-facilities.component.html',
  styleUrls: ['./add-edit-facilities.component.scss']
})

export class AddEditFacilitiesComponent implements OnInit {

    @Input('heading') heading = 'Add Facility';

    @Input('saveButtonTitle') saveBtnTitle = 'Add';

    @Input('mode') mode = 'add';

    addEditFacilityForm: FormGroup;

    wait: boolean = false;

    states = [
        {value: 'california-0', viewValue: 'California'},
        {value: 'texas-1', viewValue: 'Texas'},
        {value: 'illinois-2', viewValue: 'Illinois'}
    ];
    countries = [
        {value: 'usa-0', viewValue: 'United state of america'},
        {value: 'UK-1', viewValue: 'United Kingdom'},
        {value: 'dubai-2', viewValue: 'Dubai'}
    ];

     timeZones = [
        {value: 'EST', viewValue: 'EST'},
        {value: 'IST', viewValue: 'IST'},
        {value: 'PST', viewValue: 'PST'},
         {value: 'CST', viewValue: 'CST'}
    ];

    weekDays = [
         'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
    ];

    constructor(private _fb: FormBuilder, public _dialogRef: MdDialogRef<AddEditFacilitiesComponent>,public httpService:HttpService,public toastCtrl: ToastController) { 
        let onlyCharacters = Pattern.onlyCharacters;
        let phoneNumber = Pattern.phoneNumber;
        let alphaNumeric = Pattern.alphaNumeric;
        let onlyNumberPattern=Pattern.onlyNumberPattern;

        this.addEditFacilityForm = this._fb.group({         
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
            facilityId: new FormControl(),
            phoneNumber: new FormControl('', [Validators.required, Validators.pattern(onlyNumberPattern)]),
            address1: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
            address2: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(30)]), 
            city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
            daysOfOperationFrom: new FormControl('', [Validators.required]),
            daysOfOperationTo: new FormControl('', [Validators.required]),
            hoursOfOperationFrom: new FormControl('', [Validators.required]),
            hoursOfOperationTo: new FormControl('', [Validators.required]),
            timeZone: new FormControl('', [Validators.required]),
            country:new FormControl('', [Validators.required]),
            state:new FormControl('', [Validators.required]),
            zipCode: new FormControl('', [Validators.required, Validators.pattern(alphaNumeric), Validators.maxLength(8)])             
        });
    }
    
    ngOnInit(): void{        
        $('.add-edit-facilities-wrap').closest('.cdk-overlay-pane').addClass('facilitiesAddEditPopup');        
    }

    ngAfterViewInit() {
        
    }

    saveFacility({value, valid}: {value: any, valid: boolean}) {        
       
        if (!valid) {
            this.addEditFacilityForm.markAsDirty();
            this.addEditFacilityForm.get('state').markAsTouched();
            this.addEditFacilityForm.get('daysOfOperationFrom').markAsTouched();
            this.addEditFacilityForm.get('daysOfOperationTo').markAsTouched();
            this.addEditFacilityForm.get('timeZone').markAsTouched();

        } else {
            this.wait = true;
            this.addEditFacilityForm.markAsPristine();
            if (this.mode === 'add') {
                // delete value.facilityId;
            this.httpService.save(UrlDetails.$facilitySaveUrl, value)
                .subscribe(response => {           
                    if (response.responseCode == "200") {
                        this.toastCtrl.successToast("Facility record added successfully.");                               
                        this._dialogRef.close('save');               
                    } else {
                        this.toastCtrl.errorToast("Error occurred while adding facility.");
                    }                
                    this.wait = false;
                }, (error) => {
                    this.wait = false;
                  })
            } else {
                
             this.httpService.save(UrlDetails.$updateFacilityUrl, value)
                .subscribe(response => {           
                    if (response.responseCode == "200") {
                        this.toastCtrl.successToast("Facility record updated successfully.");                               
                        this._dialogRef.close('Update');               
                    } else {
                        this.toastCtrl.successToast("Error occurred while updating facility.");
                    }                
                    this.wait = false;
                }, (error) => {
                    this.wait = false;
                })
            }
        }
    }

    setEditFormValues(details?: any) {        
        this.addEditFacilityForm.patchValue(details);
    }

    closePopup() {
        this._dialogRef.close();
    }

}
