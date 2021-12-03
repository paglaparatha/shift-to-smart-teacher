import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CALENDAR } from '../models/calendar.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  calendar: CALENDAR[]
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.api.onGetCalendar().subscribe(res => {
      this.calendar = res
    })
  }

  doRefresh(event) {
    this.api.onGetCalendar().subscribe(res => {
      this.calendar = res
      event.target.complete()
    })
  }

}
