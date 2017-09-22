import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-job-details-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class JobDetailsPaymentMethodComponent implements OnInit {

  paymentMethod: any = 1;

  constructor(public _dialogRef: MdDialogRef<JobDetailsPaymentMethodComponent>) { 
    
  }

  ngOnInit() {
    
  }
 
  closePopup() {
    this._dialogRef.close();
  }

}

