import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { FileUploadController } from '../../../../shared/controllers/file-uploader.controller';
import { HttpService } from '../../../../../service/http.service';
import { UrlDetails } from '../../../../../model/url/url-details.model';
import { ToastController } from '../../../../shared/controllers/toast.controller';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})

export class UploadListComponent implements OnInit {

    fileContent : string = '';
    constructor(public _dialogRef: MdDialogRef<UploadListComponent>,
                private fileUploadCtrl : FileUploadController,
                private httpService : HttpService,
                private toaster : ToastController) { 
        
    }

    ngOnInit() {

    }

    closePopup() {
      this._dialogRef.close();
    }

    saveFacilities(){
        this.httpService.save(UrlDetails.$uploadFacilitiesUrl, this.fileContent)
        .subscribe(response =>{
            //console.log("response: "+response);
            if(response.responseCode==200)
            {
                this.toaster.successToast("Facilities added successfully");
                this._dialogRef.close('save');
            }
            else if(response.responseCode==409)
            {
                this.toaster.errorToast("Please check file contents.");
            }
        }, (error) => {

        });

      this._dialogRef.close('save');
    }

    fileChange(input) {
        this.fileUploadCtrl.readFile(input, (dataUrl) => {
            this.fileContent = dataUrl;
        });
    }

  
}
