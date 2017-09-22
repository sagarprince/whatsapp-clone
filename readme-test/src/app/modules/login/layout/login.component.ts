import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Response} from '@angular/http';
import { HttpService} from '../../../service/http.service';
import { User} from '../../../model/user.model';
import { UrlDetails} from '../../../model/url/url-details.model';
import { ToastController } from '../../shared/controllers/toast.controller';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  user : User = new User();
  userType : any;
  rememberMe : boolean = false;

  constructor(private router : Router,
              private httpService : HttpService,
              public _toastCtrl: ToastController){ }

  ngOnInit() {
      if(localStorage.getItem("rememberMe.userName") && localStorage.getItem("rememberMe.password"))
      {
          this.rememberMe = true;
          this.user.userName = localStorage.getItem("rememberMe.userName");
          this.user.password = atob(localStorage.getItem("rememberMe.password"));
      }
  }

  login() {

    console.log(this.rememberMe);

    if(this.rememberMe)
    {
        localStorage.setItem("rememberMe.userName",this.user.userName);
        localStorage.setItem("rememberMe.password",btoa(this.user.password));
    }
    else
    {
        localStorage.removeItem("rememberMe.userName");
        localStorage.removeItem("rememberMe.password");
    }
         
    let user = new User();
    user.userName = this.user.userName;
    user.password = btoa(this.user.password);

    this.httpService.login(UrlDetails.$loginUrl, user)
      .subscribe(response =>{
        console.log(response);
        if(response.responseCode == 200) {
          console.log("response is "+response.responseData.userTypeCode)

          this.userType = response.responseData.userTypeCode;
          console.log(this.userType);

          if (typeof window.localStorage !== 'undefined') {
            localStorage.setItem("userRole", response.responseData.userRoleName);
            localStorage.setItem("userName", response.responseData.userName);
          }
          
          switch (this.userType) {
            case 'SUPER_ADMIN':
              this.router.navigate(['/super-admin']);
              break;
            case 'CLIENT':
              if (response.responseData.userRoleCode === 'CLIENT_ADMIN') {          
                this.router.navigate(['/admin']);
              } else if (response.responseData.userRoleCode === 'CLIENT_MANAGER') {
                //this.router.navigate(['/super-admin']);
                 this._toastCtrl.errorToast('CLIENT MANAGER Functionality is under development');
              } else if (response.responseData.userRoleCode === 'USER') {
                //this.router.navigate(['/super-admin']);
                this._toastCtrl.errorToast('CLIENT USER Functionality is under development');
              } else {
                this._toastCtrl.errorToast('Invalid Client UserType');
              }
              break;
            case 'VENDOR':
              //TODO
              this._toastCtrl.errorToast('VENDOR Functionality is under development');
              break;

            default:
              this._toastCtrl.errorToast('Invalid UserType');
              break;
          }
        } else {
          this._toastCtrl.errorToast('Invalid Credentials');
        } 
      }, (error) => {
         
      })
  }

  gotoForgotPassword() {
    this.router.navigate(['forgotPassword']);
  }
}
