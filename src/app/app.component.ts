import { AfterViewInit, Component, OnDestroy, ViewChild, NgZone } from '@angular/core';

import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { presentAlert } from './utils';
import { ApiService } from './api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  backButtonSubscription;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private api: ApiService,
    private zone: NgZone
  ) {
    this.initializeApp();
  }

  sub: Subscription

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('cordova') || this.platform.is('capacitor')) {
        this.oneSignal.startInit('817dc34f-d25a-41e0-a4ca-21541c8e9401', '329157504762');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

        this.oneSignal.handleNotificationReceived().subscribe((data) => {
          this.zone.run(() => {
            switch (data.payload.title) {
              case 'New message':
                this.api.onNotificationRecieved('message');
                break;
              case 'New request':
                this.api.onNotificationRecieved('request');
                break;
              default:
                presentAlert(this.alertCtrl, data.payload.title, data.payload.body)
            }
          })
        });

        this.oneSignal.handleNotificationOpened().subscribe((data) => {
          switch (data.notification.payload.title) {
            case 'New message':
              this.router.navigate(['/messages']);
              break;
            case 'New request':
              this.router.navigate(['/requests']);
              break;
            default:
              presentAlert(this.alertCtrl, data.notification.payload.title, data.notification.payload.body)
          }
        });

        this.oneSignal.endInit();

        this.sub = this.api.teacher.subscribe(t => {
          if (t) {
            this.oneSignal.getIds().then(data => {
              this.api.onSendOID(data.userId).subscribe(res => {
              })
            })
          }
        })
      }
    });
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        if (this.router.url === '/home' || this.router.url === '/login') {
          navigator['app'].exitApp();
        }
        else {
          this.routerOutlet.pop();
        }
      }
      else {
        navigator['app'].exitApp();
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
    this.sub.unsubscribe()
  }
}
