import { Injectable } from '@angular/core';

import { MdSnackBar } from '@angular/material';

import { ToastComponent  } from '../components/toast/toast.component';

@Injectable()
export class ToastController {  

    constructor(public _snackbar: MdSnackBar) {
        
    }

    successToast(text: string) {
        let toastRef = this._snackbar.openFromComponent(ToastComponent, {
            duration: 3000,
            extraClasses: ['toast-top-right-wrap', 'toast-wrap', 'toast-success']
        });
        toastRef.instance.type = 'success';
        toastRef.instance.text = text;        
    }

    errorToast(text: string) {
        let toastRef = this._snackbar.openFromComponent(ToastComponent, {
            duration: 3000,
            extraClasses: ['toast-top-right-wrap', 'toast-wrap', 'toast-error']
        });
        toastRef.instance.type = 'error';
        toastRef.instance.text = text;
    }

}