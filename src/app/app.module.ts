import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';

// Angular 2 Firebase Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireOfflineModule } from 'angularfire2-offline';

import { FirebaseConfig } from './app.config';

import { WhatsApp } from './app.component';

@NgModule({
  declarations: [
    WhatsApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(WhatsApp, {
      preloadModules: true,
      mode: 'md'
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AngularFireOfflineModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WhatsApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
