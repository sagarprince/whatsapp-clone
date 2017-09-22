import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SiteSettingsComponent implements OnInit {

    tabs: Array<any> = [
        'Basic',
        'Email Settings',
        'User Profile Fields'
    ];

    selectedTabIndex: number = 0;
    
    constructor() {
        
    }
    
    ngOnInit(): void{        
        
    }   

    onTabSelect(tabIndex: number): void {
        this.selectedTabIndex = tabIndex;
    }

}
