import { Component, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material';

import { JobDetailsPaymentMethodComponent } from '../payment-method/payment-method.component';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.scss']
})

export class JobsDetailsComponent implements OnInit {

  constructor(public dialog: MdDialog) {
    
  }

  ngOnInit() {
    
  }

  paymentMethodPopup() {
    let paymentMethodDialogRef = this.dialog.open(JobDetailsPaymentMethodComponent, {
      width: '600px',
      height: '500px',
      panelClass: 'appModalPopup'
    });
  }
  
}

