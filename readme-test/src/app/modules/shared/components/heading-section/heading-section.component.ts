import { Component, OnInit, Input } from '@angular/core';

import { MdSidenav } from "@angular/material";

@Component({
  selector: 'app-heading-section',
  templateUrl: './heading-section.component.html',
  styleUrls: ['./heading-section.component.scss']
})

export class HeadingSectionComponent implements OnInit {

    @Input('heading') heading; 
    @Input('breadcrumbs') breadcrumbs;

    constructor() {         
    }

    ngOnInit() {      
    }    

}
