import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable()
export class AuthGuard{
 
    constructor(private router: Router) { }

    isUserLoggedIn(){
        if (localStorage.getItem('userName') && localStorage.getItem('userName')!="null") {
            return true;
        }
 
        this.router.navigate(['/login']);
        return false;
    }
}