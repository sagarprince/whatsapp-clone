import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { ToastController } from '../../../../shared/controllers/toast.controller';
import { Pattern } from '../../../../../model/util/pattern.model';
import { Vendor } from '../../../../../model/vendor.model';
import { HttpService } from '../../../../../service/http.service';
import { UrlDetails } from '../../../../../model/url/url-details.model';
import { VendorSetupComponent } from '../../vendor-setup/vendor-setup.component';
import { FileUploadController } from '../../../../shared/controllers/file-uploader.controller';

declare var $;

@Component({
  selector: 'app-add-edit-vendor-setup',
  templateUrl: './add-edit-vendor-setup.component.html',
  styleUrls: ['./add-edit-vendor-setup.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddEditVendorSetupComponent implements OnInit {

    @Input('heading') heading = 'Add Vendor';

    @Input('saveButtonTitle') saveBtnTitle = 'Add';

    addEditVendorSetupForm: FormGroup;

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

    vendor: Vendor = new Vendor();

    logoSelected: boolean = false;

    constructor(private _fb: FormBuilder, 
    public _dialogRef: MdDialogRef<AddEditVendorSetupComponent>,
    public _toastCtrl: ToastController,
    private httpService : HttpService,
    private urls : UrlDetails,
    public fileUploadCtrl: FileUploadController) {

        const EMAIL_REGEX = Pattern.emailPattern;
        const NUMBER_REGEX = Pattern.onlyNumberPattern;

        this.addEditVendorSetupForm = this._fb.group({
            vendorCode: new FormControl('', [Validators.required]),          
            vendorName: new FormControl('', [Validators.required]),          
            address: new FormControl(''),
            city: new FormControl(''),            
            state: new FormControl(''),
            country: new FormControl(''),
            zipCode: new FormControl(''),
            primaryContactPerson: new FormControl(''),
            phoneNumber: new FormControl(''),
            fax: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
            vendorId : '',
            logo : ''  
        });
    }
    
    ngOnInit(): void {                
        $('.add-edit-vendor-setup').closest('.cdk-overlay-pane').addClass('vendorAddEditPopup');       
    }

    saveVendor({value, valid}: {value: any, valid: boolean}) {        
        if (!valid) {
            this.addEditVendorSetupForm.markAsDirty();
        } else {
            this.addEditVendorSetupForm.markAsPristine();

            this.vendor.code = value.vendorCode;
            this.vendor.name = value.vendorName;
            this.vendor.address = value.address;
            this.vendor.city = value.city;
            this.vendor.contactPerson = value.primaryContactPerson;
            this.vendor.country = value.country;
            this.vendor.emailId = value.email;
            this.vendor.fax = value.fax;
            this.vendor.zipcode = value.zipCode;
            this.vendor.state = value.state;
            this.vendor.phoneNumber = value.phoneNumber;

            console.log(this.vendor);

            let url = '';

            if(value.vendorId !== '') 
            {
                this.vendor.vendorId = value.vendorId;
                url  = UrlDetails.$updateVendorUrl;
            }
            else
            {
                url  = UrlDetails.$addVendorUrl;
            }          

            this.httpService.save(url,this.vendor).subscribe(response =>{
                if(response.responseCode==200)
                {
                    this._toastCtrl.successToast("Vendor saved successfully!");
                    this._dialogRef.close('save');     
                }
                else if(response.responseCode==409)
                {
                    this._toastCtrl.errorToast(response.responseMessage);
                }
                else
                {
                    this._toastCtrl.errorToast("Vendor save failed!");
                }
            });
                
        }
    }

    setEditFormValues(details?: any) {        
        this.addEditVendorSetupForm.patchValue(details);  
        if (details.logo !== null) {
            this.vendor.logo = details.logo;
            this.logoSelected = true;
        }           
    }
    
    selectLogo(input) {
        this.fileUploadCtrl.readImageFile(input, {width: 230, height: 80}, (dataUrl) => {
            this.vendor.logo = dataUrl;
            this.logoSelected = true;
        });
    }

    removeLogo() {
        this.vendor.logo = '';
        this.logoSelected = false;
    }

    closePopup() {
        this._dialogRef.close();
    }
}
