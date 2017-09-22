import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Group } from './../../../../../model/group/create-group.model';
import { AddGroupUserComponent } from '../add-group-user/add-group-user.component';
import {HttpService} from './../../../../../service/http.service';
import {UrlDetails} from './../../../../../model/url/url-details.model'
import {Pattern} from './../../../../../model/util/pattern.model';
import { ToastController } from './../../../../../modules/shared/controllers/toast.controller';

declare var $;

@Component({
  selector: 'app-add-edit-groups',
  templateUrl: './add-edit-groups.component.html',
  styleUrls: ['./add-edit-groups.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddEditGroupsComponent implements OnInit {

    headingTitle: string = 'Add Group';

    mode: string = 'add';

    routedFrom: string = '';

    disabled: boolean = false;
 
    onlyNumberPattern : string ;
    onlyTwoDecimalPlacePattern : string;

    addGroupsForm: FormGroup;    
 
    group : Group;

    selectedGroupId : string;

    selectedGroupName: string = '';

    selectedFacilityId: string = '';

    selectedFacilityName: string = '';

    facilities = [];

    products = [];

    dialogOptions: any = {
        width: '510px',
        height: '353px',
        panelClass: 'appModalPopup'          
    };

    constructor(private _route: ActivatedRoute, private _router: Router, private _fb: FormBuilder, public dialog: MdDialog ,public httpService:HttpService ,public toastController: ToastController) {        
         this.onlyNumberPattern = Pattern.onlyNumberPattern;
         this.onlyTwoDecimalPlacePattern = Pattern.onlyTwoDecimalPlacesPattern;
         this.addGroupsForm = this._fb.group({
          groupName: new FormControl('', [Validators.required]), 
          numberOfJobsPerDay: new FormControl('', [Validators.required,Validators.min(1),Validators.pattern(this.onlyNumberPattern)]),   
          jobPricePerUserPerDay:new FormControl('', [Validators.required ,Validators.min(1), Validators.pattern(this.onlyTwoDecimalPlacePattern)]),
          facility: this._fb.group(
              {
                  facilityId: new FormControl('', [Validators.required])
              }
          ),          
          groupProducts: new FormControl([], [Validators.required]),
          users: this._fb.array([]),
          approvalManagers: this._fb.array([])
        });      
    }
  
    ngOnInit() {
        this._route.data.subscribe((dataParams: any) => {
            this.mode = dataParams.mode;
            this.routedFrom = dataParams.from;
            console.log(this.routedFrom);
            
            this.getAllFacilities();
            this.getAllProducts();

            this._route.queryParams.subscribe((qParams: any) => {
                if (qParams && typeof qParams.facilityName !== 'undefined') {
                    this.selectedFacilityName = qParams.facilityName;
                }
            });

            if (this.mode === 'add' && this.routedFrom === 'facilities') {         
                this._route.params.subscribe((param: any) => {     
                    this.selectedFacilityId = param.fid;
                });
            }

            if (this.mode === 'edit' || this.mode === 'details') {         
                this._route.params.subscribe((param: any) => {
                    console.log(param);
                    this.selectedGroupId = param.id;
                    this.selectedFacilityId = param.fid;
                    this.setEditFormValues(this.selectedGroupId);                   
                });
            }

            if (this.mode === 'details') {
                this.disabled = true;
                this.addGroupsForm.disable();
            }
        });
    }

    get _users(): FormArray {
        return this.addGroupsForm.get('users') as FormArray;
    }

    get _managers(): FormArray {
        return this.addGroupsForm.get('approvalManagers') as FormArray;
    }

    usersFormModel(id, name) {
        return new FormGroup({
            userId: new FormControl(id), 
            userName: new FormControl(name), 
        });
    }

    managersFormModel(id, name) {
        return new FormGroup({
            userId: new FormControl(id), 
            userName: new FormControl(name), 
        });
    }

    addUserPopup(type: string) {
        let dialogRef = this.dialog.open(AddGroupUserComponent, this.dialogOptions);   
        dialogRef.componentInstance.userType = type;
        dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined' && result.length !== 0) {  
                if (type === 'user') {
                    if (result) {
                        result.forEach((user) => {
                             if(this._users.value.filter(addedUser => addedUser.userId === user.userId).length === 0){
                                  this._users.push(this.usersFormModel(user.userId, user.userName)); 
                             }
                        })    
                    }                    
                } else {
                    if (result) {
                        result.forEach((user) => {
                             if(this._managers.value.filter(addedManager => addedManager.userId === user.userId).length === 0){
                                    this._managers.push(this.usersFormModel(user.userId, user.userName));
                             }
                        })    
                    }
                }                
            }
        });
    }

    saveGroup({value, valid}: {value: any, valid: boolean}) {
        if (!valid) {
            this.addGroupsForm.markAsDirty();
            this.addGroupsForm.get('facility').get('facilityId').markAsTouched();
            this.addGroupsForm.get('groupProducts').markAsTouched();
        } else {
            let postData = {
                products: []
            };
            value.groupProducts.forEach((pId) => {
                postData.products.push({
                    productId: pId
                })
            });
            value.products = postData.products;
            if(this.mode === 'edit'){
                value.groupId = this.selectedGroupId;
            }
              this.httpService.save(UrlDetails.$getGroupSaveUrl , value).subscribe(response => {
              if(response.responseCode === 200){

                     if(this.mode === 'edit'){
                        this.toastController.successToast("Group updated successfully");     
                     }else{
                        this.toastController.successToast("Group added successfully");
                     }
                     
                       this.gotoGroups();
              }else if(response.responseCode === 409){
                  this.toastController.errorToast(response.responseMessage);
              }else{
                     if(this.mode === 'edit'){
                        this.toastController.errorToast("Group updation failed");
                     }else{
                         this.toastController.errorToast("Group saving failed");
                     }
                }
             } , (error) => {
                 if(this.mode === 'edit'){
                      this.toastController.errorToast("Exception while updating group, Please try after some time");
                 }else{
                     this.toastController.errorToast("Exception while saving group, Please try after some time");
                 }
            });
        }      
    }

    getAllProducts(){
        console.log("get all products call");
         this.httpService.getAll(UrlDetails.$getAllProductsUrl).subscribe(response => {
              this.products = response.responseData;
              console.log(this.products);
         });
    }

    getAllFacilities(){
        console.log("get all facility call");
        this.httpService.getAll(UrlDetails.$facilityGetUrl)
            .subscribe(response => {
                this.facilities = response.responseData;
            })
    }

    setEditFormValues(groupId?: any) {   
        this.httpService.findById(UrlDetails.$groupGetByGroupIdUrl,{"groupId" : groupId}).subscribe(response => {
           let group = response.responseData;
           this.headingTitle = group.groupName;
           this.selectedGroupName = group.groupName;
           let products = [];
           group.products.forEach((product) => {
               products.push(product.productId);
           });           
           group.groupProducts = products;
           this.addGroupsForm.patchValue(group);           

           group.users.forEach((user) => {
              this._users.push(this.usersFormModel(user.userId, user.userName));
           })
           group.approvalManagers.forEach((user) => {
              this._managers.push(this.managersFormModel(user.userId, user.userName));
           })       
        });
    }

    removeUser(index) {
        this._users.removeAt(index);
    }

    removeManager(index) {
        this._managers.removeAt(index);
    }

    gotoGroups(){
        if (this.routedFrom === 'facilities') {
            this._router.navigate(['admin/facilities/facility/'+this.selectedFacilityId+'/groups']);
        } else {
            this._router.navigate(['admin/groups']);
        }        
    }

}   
