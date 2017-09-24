// Import Angular Core Controllers.
import { Component } from '@angular/core';

// Import Ionic Controllers.
import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';

// Import Angular2Firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage({
  name: 'all-users-page'
})

@Component({
  selector: 'page-all-users',
  templateUrl: 'all-users.html',
})
export class AllUsersPage {

  users: FirebaseListObservable<any[]>;

  allUsers: Array<any> = [];

  mobileNumber: number; 

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public _nav: Nav,
  private firebaseDb: AngularFireDatabase) {
    this.mobileNumber = navParams.get('mobileNumber');
  }

  ionViewDidLoad() {
    this.users = this.firebaseDb.list('/users');
    this.users.subscribe((allUsers) => {
      this.allUsers = allUsers.filter((user) => {
        return this.mobileNumber != user.$key;
      });
    });
  }

  gotoSingleChat(user) {
    console.log(user);
    // this._nav.push(
    //   'single-chat-page', 
    //   {
    //     toMobileNumber: user.$key,
    //     toName: user.name
    //   },
    //   {
    //     animate: true,
    //     animation: 'ios-transition',
    //     direction: 'forward'
    //   }
    // );
  }

}
