import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(private http: Http, private router: Router) { }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  login(url: string, user: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, user, options)
      .map(this.extractData);
  }

 getAll(url : string): Observable<any>{
    // let headers = new Headers({'Content-Type' : 'appl;ication/json' , 'Access-Control-Allow-Origin' : '*'});
    // let options = new RequestOptions({headers : headers});
    return this.http.get(url).map(this.extractData) ;
  }//getAll

  save(url: string, value: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, value, options)
      .map(this.extractData);
  }//save


  delete(url: string, value: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, value, options)
      .map(this.extractData);
  }//delete

  update(url: string, value: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, value, options)
      .map(this.extractData);
  }//update

 remove(url : string,value : any): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,value,options)
                    .map(this.extractData) ;
  }

  findById(url : string , value : any): Observable<any>  {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,value,options).map(this.extractData) ;
  }

  uploadUsers(url : string,data:any){
    return this.http.post(url,data)
    .map(this.extractData);
  }


}//HttpService