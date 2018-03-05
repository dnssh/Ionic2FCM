import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public push: Push, public alertCtrl: AlertController,public storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();
    });
  }

  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '179505181067'
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'true'
     },
     windows: {}
  };
 
  const pushObject: PushObject = this.push.init(options);
 
  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New notification',
        message: notification.message
      });
      JSON.stringify(youralert.present());
      console.log(notification.message);
    }
  });
 
  pushObject.on('registration').subscribe((registration: any) => {
    alert(registration.registrationId);
    this.storage.set('devansh',"shah");
    this.storage.set('regid',registration.registrationId);
    //this.storage.set('id1',registration.registrationId);
    //var id1=registration.registrationId;
    console.log(registration.registrationId);

  });
 
  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }

}

