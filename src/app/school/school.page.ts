import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { ADMIN } from '../models/admin.model';
import { TEACHER_DATA } from '../models/teacher.model';
import { PATH } from '../utils';

@Component({
  selector: 'app-school',
  templateUrl: './school.page.html',
  styleUrls: ['./school.page.scss'],
})
export class SchoolPage implements OnInit, OnDestroy {

  userSub: Subscription
  user: TEACHER_DATA
  path: string = PATH
  admins: ADMIN[]
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.userSub = this.api.teacher.subscribe(data => {
      this.user = data
    })
  }

  ionViewWillEnter() {
    this.api.onGetSchoolAdmins().subscribe(res => {
      this.admins = res
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
    this.api.onGetTeacher()
    this.api.onGetSchoolAdmins().subscribe(res => {
      this.admins = res;
      event.target.complete();
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
