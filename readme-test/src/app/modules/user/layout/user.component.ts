import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { AuthGuard } from '../../login/layout/authguard.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user : User = new User();
  json : any;
  flag : boolean;

  constructor(authGuard : AuthGuard) { 
    this.flag = authGuard.isUserLoggedIn();
    if(this.flag)
    {
      this.json = JSON.parse(localStorage.getItem('loggedInUser'));
      this.user.userName = this.json.userType.userTypeName;
    }
  }

  ngOnInit() {
  }

  getLoggedInUser(){
    return this.user;
  }

}
