import { Component, OnInit } from '@angular/core';
import { Http, Response} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';

import { Login } from './login.model';
import { UrlDetails} from '../../../model/url/url-details.model';
import { HttpService} from '../../../service/http.service';
import { ToastController } from '../../shared/controllers/toast.controller';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./login.component.scss']
})



export class ForgotPasswordComponent implements OnInit {

  loginRequest: Login = new Login();

  constructor(private _router: Router,
              private httpService : HttpService,
              private toastController : ToastController) { }
  

  ngOnInit() {
  }
  gotoLogin() {
    this._router.navigate(['login']);
  }

  forgotPassword(){
    this.httpService.save(UrlDetails.$forgotPasswordUrl,
    {emailId : this.loginRequest.userName}).subscribe(response =>{
      console.log(response);

      if(response.responseCode==200)
      {
          this.toastController.successToast("Password reset successfully!");
      }
      else
      {
          this.toastController.errorToast("Password reset failed!");
      }
    });
  }

}
