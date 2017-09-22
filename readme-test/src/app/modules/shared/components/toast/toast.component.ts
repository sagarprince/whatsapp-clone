import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html'
})

export class ToastComponent {
    @Input('type') type: string = 'success';

    @Input('text') text: string = '';   

    constructor() {        
    }
}
