import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TEACHER_DATA } from '../models/teacher.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  darkMode: boolean
  userSub: Subscription
  user: TEACHER_DATA
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.userSub = this.api.teacher.subscribe(data => {
      this.user = data
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
  }

}
