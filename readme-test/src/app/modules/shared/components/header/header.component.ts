import { Component, OnInit, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdSidenav } from "@angular/material";
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
    userName: string;
    userRole: string;

    @Input('sidenav') sidenav: MdSidenav;

    @HostBinding('class') classes = 'app-header';

    constructor(public dialog: MdDialog, public router: Router) { 
        
    }

    ngOnInit() {
      this.userName = localStorage.getItem("userName");
      this.userRole = localStorage.getItem("userRole");   
    }

    changePassword() {
      let changePasswordDialogRef = this.dialog.open(ChangePasswordComponent, {
        width: '510px',
        height: '320px',
        panelClass: 'appModalPopup'
      });      
    }

    logout() {
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");   
        this.router.navigate(['login']);
    }

}
