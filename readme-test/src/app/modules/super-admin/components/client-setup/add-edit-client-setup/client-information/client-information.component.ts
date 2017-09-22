import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '../../../../../shared/controllers/toast.controller';
import { Pattern } from '../../../../../../model/util/pattern.model';
import { FileUploadController } from '../../../../../shared/controllers/file-uploader.controller';
import { UrlDetails } from '../../../../../../model/url/url-details.model';
import { HttpService } from '../../../../../../service/http.service';

@Component({
  selector: 'app-client-information',
  templateUrl: './client-information.component.html',
  styleUrls: ['./client-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ClientInformationComponent implements OnInit {

    @Input('mode') mode = '';

    clientInformationForm: FormGroup;

    logoSelected: boolean = false;

    logoString: string = '';   

    constructor(private _fb: FormBuilder,     
    public _toastCtrl: ToastController,
    public fileUploadCtrl: FileUploadController,public httpService:HttpService) {
        const EMAIL_REGEX = Pattern.emailPattern;
        const NUMBER_REGEX = Pattern.onlyNumberPattern;

        this.clientInformationForm = this._fb.group({
            clientCode: new FormControl('', [Validators.required]),          
            clientName: new FormControl('', [Validators.required]),          
            address: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),           
            zipCode: new FormControl('', [Validators.required]),
            countryCode: new FormControl('', [Validators.required]),
            phoneNumber: new FormControl(''),
            fax: new FormControl(''),
            logo: '',
            clientId:new FormControl(),
            emailId: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),  
        });
    }
    
    ngOnInit(): void{        
        
    }

    saveClient({value, valid}: {value: any, valid: boolean}) {                
        if (!valid) {
            this.clientInformationForm.markAsDirty();
        } else {
            this.clientInformationForm.markAsPristine();
            if (this.mode === 'add') {                
                delete value.clientId;                
                this.httpService.save(UrlDetails.$createClientUrl,value).subscribe(response =>{
                    if(response.responseCode=="200")
                    {
                        this._toastCtrl.successToast("Client has been added Successfully");                        
                    }
                    else if(response.responseCode=="409")
                    {
                        this._toastCtrl.errorToast("Record with user name or email id already exists");
                    }
                    else
                    {
                        this._toastCtrl.errorToast("Something went wrong !!");                           
                    }
                
                }); 
            } else {
                 this.httpService.update(UrlDetails.$updateClientUrl,value).subscribe(response =>{
                    if(response.responseCode=="200")
                    {
                        this._toastCtrl.successToast("Client has been updated Successfully");                        
                    }
                    else if(response.responseCode=="409")
                    {
                        this._toastCtrl.errorToast("Record with user name or email id already exists");
                    }
                    else
                    {
                        this._toastCtrl.errorToast("Something went wrong !!");                            
                    }
                 });
            }                                                                                                                                                                                                                                                                                                                                                     
        }
    }

    setEditFormValues(details?: any) {        
        this.clientInformationForm.patchValue(details);
        if (this.clientInformationForm.controls['logo'].value !== '') {
            this.logoSelected = true;
        }
    }

    selectLogo(input) {
        this.fileUploadCtrl.readImageFile(input, {width: 230, height: 80}, (dataUrl) => {
            this.clientInformationForm.controls['logo'].setValue(dataUrl);
            this.logoSelected = true;
        });
    }

    removeLogo() {
        this.clientInformationForm.controls['logo'].setValue('');
        this.logoSelected = false;
    }

}
