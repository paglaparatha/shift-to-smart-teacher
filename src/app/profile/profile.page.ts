import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { TEACHER_DATA } from '../models/teacher.model';
import { PATH } from '../utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userSub: Subscription
  user: TEACHER_DATA
  path: string = PATH
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.userSub = this.api.teacher.subscribe(data => {
      this.user = data
    })
  }

  doRefresh(event) {
    this.api.onGetTeacher().subscribe(res => {
      event.target.complete();
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


}
