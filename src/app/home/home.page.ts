import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { TEACHER_DATA } from '../models/teacher.model';
import { PATH } from '../utils';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  userSub: Subscription
  user: TEACHER_DATA
  path: string = PATH
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.userSub = this.api.teacher.subscribe(data => {
      this.user = data
    })
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    loop: true,
    grabCursor: true,
    autoplay: {
      disableOnInteraction: false
    }
  };

  doRefresh(event) {
    this.api.onGetTeacher().subscribe(res => {
      event.target.complete();
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
