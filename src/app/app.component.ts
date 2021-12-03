import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router: Router,
  ) {
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
  }
}
