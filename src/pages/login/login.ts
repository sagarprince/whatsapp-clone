// Import Angular Core Controllers.
import { Component, ViewChild } from '@angular/core';

// Import Ionic Controllers.
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

// Import Angular Reactive Form Controllers.
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';

@IonicPage({
  name: 'login-page'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  login: FormGroup;

  recaptchaVerifier: any;

  user: FirebaseObjectObservable<any>;

  constructor(private formBuilder: FormBuilder, 
  public navCtrl: NavController, 
  public navParams: NavParams, 
  private storage: Storage,
  public alertCtrl: AlertController,
  public loadingCtrl: LoadingController,
  private firebaseDb: AngularFireDatabase,
  public afAuth: AngularFireAuth) {

    this.login = this.formBuilder.group({
      mobileNumber: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required])
    });
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log('ionViewDidLoad Login');
  }

  onLogin({ value, valid }: { value: any, valid: boolean }) {    
    if (valid) {
      const phoneNumberString = '+91' + value.mobileNumber;

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 2000);

      this.afAuth.auth.signInWithPhoneNumber(phoneNumberString, this.recaptchaVerifier).then((confirmationResult) => {
          console.log(confirmationResult);
          
          let prompt = this.alertCtrl.create({
            title: 'Enter the Confirmation code',
            inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
            buttons: [
              { text: 'Cancel',
                handler: data => {  
                  this.recaptchaVerifier.clear();
                  this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
                }
              },
              { text: 'Verify',
                handler: data => {
                  let loading = this.loadingCtrl.create({
                    content: 'Please wait...'
                  });
                  loading.present();

                  confirmationResult.confirm(data.confirmationCode)
                  .then((result) => {                
                    
                    console.log(result.user.uid);
                    this.user = this.firebaseDb.object('/users/' + result.user.uid);
                    this.user.set({
                      name: value.fullName,
                      mobileNumber: value.mobileNumber,
                      state: 'online'
                    });
                    loading.dismiss();  

                    this.storage.set('userDetails', value);
                    this.storage.set('userId', result.user.uid);
                    this.navCtrl.setRoot('all-users-page');

                  }).catch((error) => {
                    console.log(error);
                    this.recaptchaVerifier.clear();
                    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');   
                    loading.dismiss();                 
                  });
                }
              }
            ]
        });
        prompt.present();        
      }).catch((error) => {
        console.log(error);
        this.recaptchaVerifier.clear();
        this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      });
    }
  }

}
