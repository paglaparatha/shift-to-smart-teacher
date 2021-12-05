import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TEACHER_DATA } from '../models/teacher.model';
import { ApiService } from '../api.service';
import { NOTIFICATION } from '../models/notification.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  darkMode: boolean
  userSub: Subscription
  user: TEACHER_DATA
  notificationsSub: Subscription
  notifications: NOTIFICATION
  notificationsCount: number = 0
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.userSub = this.api.teacher.subscribe(data => {
      this.user = data
    })

    this.notificationsSub = this.api.notifications.subscribe(data => {
      this.notificationsCount = 0;
      this.notifications = data;
      Object.values(data).forEach(val => this.notificationsCount += val)
    })

    if (localStorage.getItem('dark')) {
      this.darkMode = JSON.parse(localStorage.getItem('dark'))
    } else {
      this.darkMode = false
    }
    document.querySelector('html').setAttribute('theme', this.darkMode ? 'dark' : 'light')
  }

  logout() {
    this.api.onLogout()
  }

  changeMode() {
    localStorage.setItem('dark', this.darkMode.toString())
    document.querySelector('html').setAttribute('theme', this.darkMode ? 'dark' : 'light')
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
    this.notificationsSub.unsubscribe();
  }

}
