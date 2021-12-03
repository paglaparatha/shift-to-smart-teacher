import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { SCHEDULE } from '../models/schedule.model';
import { PATH } from '../utils';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  path = PATH
  schedule: SCHEDULE[]
  constructor(private api: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.api.onGetSchedule().subscribe(res => {
      this.schedule = res
    })
  }

  getSafeUrl(url: string) {
    return  this.sanitizer.bypassSecurityTrustResourceUrl(this.path + url)
  }

  doRefresh(e) {
    this.api.onGetSchedule().subscribe(res => {
      this.schedule = res
      e.target.complete();
    })
  }
}
