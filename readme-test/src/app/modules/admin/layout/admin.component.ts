import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AdminComponent implements OnInit {

  menus: Array<any> = [];

  constructor() { 
    this.menus = [ 
      {
        name: 'Dashboard',
        link: 'dashboard',
        icon: 'icon-ic_dashboard_black_36px3'
      },
      {
        name: 'Management',
        link: 'no-link',
        icon: 'icon-ic_insert_drive_file_black_36px3',        
        subMenus: [
          {
            name: 'Facilities',
            link: 'facilities'
          },
          {
            name: 'Groups',
            link: 'groups'
          },
          {
            name: 'Products',
            link: 'products'
          },
          {
            name: 'Users',
            link: 'users'
          }
        ],
        subMenuOpened: false
      },
      {
        name: 'Jobs',
        link: 'jobs',
        icon: 'icon-ic_print_black_24px3'
      },
      {
        name: 'Reports',
        link: 'reports',
        icon: 'icon-report3'
      },
      {
        name: 'Cost Center',
        link: 'cost-center',
        icon: 'icon-costCenter3'
      }      
    ]
  }

  ngOnInit() {

  }

  sideNavClosed() {
    console.log(true);
  }

}
