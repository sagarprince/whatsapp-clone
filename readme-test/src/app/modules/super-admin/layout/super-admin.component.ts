import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SuperAdminComponent implements OnInit {

  menus: Array<any> = [];

  constructor() { 
    this.menus = [ 
      {
        name: 'Dashboard',
        link: 'dashboard',
        icon: 'icon-ic_dashboard_black_36px3'
      },
      {
        name: 'Client Setup',
        link: 'client-setup',
        icon: 'icon-ic_insert_drive_file_black_36px3',       
      },
      {
        name: 'Vendor Setup',
        link: 'vendor-setup',
        icon: 'fa fa-handshake-o'
      },
      {
        name: 'User Setup',
        link: 'user-setup',
        icon: 'fa fa-user'
      },
      {
        name: 'Queue Setup',
        link: 'queue-setup',
        icon: 'fa fa-wrench'
      }
    ];
  }

  ngOnInit() {

  }

  sideNavClosed() {
    console.log(true);
  }

}
