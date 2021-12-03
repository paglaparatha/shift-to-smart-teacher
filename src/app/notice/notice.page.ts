import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NOTICE } from '../models/notice.model';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.page.html',
  styleUrls: ['./notice.page.scss'],
})
export class NoticePage implements OnInit {

  notice: NOTICE[]
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.api.onGetNotice().subscribe(res => {
      this.notice = res
    })
  }

  doRefresh(event) {
    this.api.onGetNotice().subscribe(res => {
      this.notice = res
      event.target.complete()
    })
  }

}
