import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { ToastController } from '../../../../shared/controllers/toast.controller';
import { Pattern } from '../../../../../model/util/pattern.model';
import { FileUploadController } from '../../../../shared/controllers/file-uploader.controller';

@Component({
  selector: 'app-add-edit-queue-setup',
  templateUrl: './add-edit-queue-setup.component.html',
  styleUrls: ['./add-edit-queue-setup.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddEditQueueSetupComponent implements OnInit {

    @Input('heading') heading = 'Add Queue';

    @Input('saveButtonTitle') saveBtnTitle = 'Add';

    @Input('mode') mode = '';

    addEditQueueSetupForm: FormGroup;

    queues = [
        {value: 'Queue 1', text: 'Queue 1'},
        {value: 'Queue 2', text: 'Queue 2'},
        {value: 'Queue 3', text: 'Queue 3'},
        {value: 'Queue 4', text: 'Queue 4'},
        {value: 'Queue 5', text: 'Queue 5'}
    ];

    constructor(private _fb: FormBuilder, 
    public _dialogRef: MdDialogRef<AddEditQueueSetupComponent>,
    public _toastCtrl: ToastController,
    public fileUploadCtrl: FileUploadController) {

        this.addEditQueueSetupForm = this._fb.group({
            queueName: new FormControl('', [Validators.required]),                      
            queueType: new FormControl('', [Validators.required]),
            queueFor: new FormControl('', [Validators.required]),
            project: new FormControl('', [Validators.required]),
            nextQueue: new FormControl('', [Validators.required])
        });
    }
    
    ngOnInit(): void{        
        $('.add-edit-queue-setup').closest('.cdk-overlay-pane').addClass('queueAddEditPopup');
    }

    saveQueue({value, valid}: {value: any, valid: boolean}) {                
        if (!valid) {
            this.addEditQueueSetupForm.markAsDirty();
            this.addEditQueueSetupForm.get('nextQueue').markAsTouched();
        } else {
            this.addEditQueueSetupForm.markAsPristine();
            this._dialogRef.close();        

            if (this.mode === 'add') {
                this._toastCtrl.successToast('Added Successfully !');
            } else {
                this._toastCtrl.successToast('Saved Successfully !');
            }            
        }
    }

    setEditFormValues(details?: any) {        
        this.addEditQueueSetupForm.patchValue(details);
    }

    closePopup() {
        this._dialogRef.close();
    }

}
