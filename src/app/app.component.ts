import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { environment } from '../environments/environment';
import firebase from 'firebase';

import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/Storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(() => {
      statusBar.styleLightContent();
      splashScreen.hide();

    });

    firebase.initializeApp(environment.firebase);
  }
}

