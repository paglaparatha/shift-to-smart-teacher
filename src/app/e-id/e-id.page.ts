import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { TEACHER_DATA } from '../models/teacher.model';
import { PATH } from '../utils';

@Component({
  selector: 'app-e-id',
  templateUrl: './e-id.page.html',
  styleUrls: ['./e-id.page.scss'],
})
export class EIdPage implements OnInit {

  userSub: Subscription
  user: TEACHER_DATA
  path: string = PATH
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.userSub = this.api.teacher.subscribe(data => {
      this.user = data
    })
  }

  ionViewWillLeave(): void {
    this.userSub.unsubscribe();
  }

}
