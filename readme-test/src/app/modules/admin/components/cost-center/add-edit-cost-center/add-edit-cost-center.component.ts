import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { ToastController } from '../../../../shared/controllers/toast.controller';
import { HttpService } from '../../../../../service/http.service';
import { UrlDetails } from '../../../../../model/url/url-details.model';
import { Pattern } from '../../../../../model/util/pattern.model';

@Component({
  selector: 'app-add-edit-cost-center',
  templateUrl: './add-edit-cost-center.component.html',
  styleUrls: ['./add-edit-cost-center.component.scss']
})

export class AddEditCostCenterComponent implements OnInit {

    @Input('heading') heading = 'Add Cost Center';

    @Input('saveButtonTitle') saveBtnTitle = 'Add';

    @Input('mode') mode = 'add';

    addEditCostCenterForm: FormGroup;    

    dtCtrl: any = null;
  
    groups: Array<any> = [];

    onlyNumberPattern : string ;

    constructor(private _fb: FormBuilder, 
    public _dialogRef: MdDialogRef<AddEditCostCenterComponent>,
    public _toastCtrl: ToastController,public httpService: HttpService) {      
    this.addEditCostCenterForm = this._fb.group({
            costCenterName: new FormControl('', [Validators.required]),
            costCenterCode: new FormControl('', [Validators.required]),
            budgetLimit: new FormControl('',[Validators.required, Validators.pattern(Pattern.onlyNumberPattern)]),
            groups : new FormControl('', Validators.required),
            costCenterId : new FormControl()          
        });
    }
    
    ngOnInit() {        
        this.getAllGroups();
    }

    saveCostCenter({value, valid}: {value: any, valid: boolean}) {
        if (!valid) {
            this.addEditCostCenterForm.markAsDirty();
            this.addEditCostCenterForm.get('groups').markAsTouched();
        } else {
            this.addEditCostCenterForm.markAsPristine();
            value.groups = this.groupsObject;
             this.httpService.save(UrlDetails.$costCenterSaveUrl,value).subscribe((response) =>{
                this._dialogRef.close('saved');   
                if(response.responseCode === 200){
                    if(this.mode === 'edit'){
                        this._toastCtrl.successToast(value.costCenterName + ' updated successfully');
                    }else{
                        this._toastCtrl.successToast(value.costCenterName + ' added successfully');
                    }
               }else if(response.responseCode === 409){
                     this._toastCtrl.errorToast(response.responseMessage);
                }else{
                    if(this.mode === 'edit'){
                     this._toastCtrl.errorToast(value.costCenterName + ' updation failed');    
                    }else{
                      this._toastCtrl.errorToast(value.costCenterName + ' creation failed');    
                    }
                }
             },(error) => {
                  if(this.mode === 'edit'){
                        this._toastCtrl.errorToast('exception while updating cost center ' + value.costCenterName);
                  }else{
                      this._toastCtrl.errorToast('exception while creating cost center ' + value.costCenterName);
                  }
            })     
            
        }
    }

    get groupsObject() {
        let selectedGroups = this.addEditCostCenterForm.controls['groups'].value;
        let groupsObject = [];
        if (selectedGroups.length > 0) {
            selectedGroups.forEach(group => {
                groupsObject.push({
                    groupId: group
                });
            });
        }
        return groupsObject;
    }

    setEditFormValues(details?: any) {        
        this.addEditCostCenterForm.patchValue(details);
    }

    closePopup() {
        this._dialogRef.close();
    }

     getAllGroups() {
        this.httpService.getAll(UrlDetails.$getAllGroupsResponseUrl)
            .subscribe(response => {   
                console.log('Group response');
                console.log(response);
                this.groups = response.responseData;            
            }, (error) => {      
            });
    } //ge

}
