import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements OnInit {

  constructor(private api: ApiService, private picker: PickerController) { }
  classSection: { "class", section };
  load: boolean = true;
  days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  selectedDay = 'mon'
  count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  timetable
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.classSection = this.api.teacher.value.teacher['class-teacher'] == 1 ? { "class": this.api.teacher.value.teacher.class, "section": this.api.teacher.value.teacher.section.toUpperCase() } : {"class": 1, "section": 'A'}
    this.api.onGetTimetable(this.classSection).subscribe(res => {
      this.load = false
      this.timetable = res
    })
  }

  async showBasicPicker() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done'
        }
      ],
      columns: [
        {
          name: 'Class',
          options: [
            { text: '1', value: '1' },
            { text: '2', value: '2' },
            { text: '3', value: '3' },
            { text: '4', value: '4' },
            { text: '5', value: '5' },
            { text: '6', value: '6' },
            { text: '7', value: '7' },
            { text: '8', value: '8' },
            { text: '9', value: '9' },
            { text: '10', value: '10' },
            { text: '11', value: '11' },
            { text: '12', value: '12' },

          ]
        },
        {
          name: 'Section',
          options: [
            { text: 'A', value: 'a' },
            { text: 'B', value: 'b' },
            { text: 'C', value: 'c' },
            { text: 'D', value: 'd' },
            { text: 'E', value: 'e' },
            { text: 'F', value: 'f' },
          ]
        }
      ]
    };
    let picker = await this.picker.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      this.load = true
      this.classSection = { "class": data.data['Class']['value'], "section": data.data['Section']['text'] }
      this.api.onGetTimetable(this.classSection).subscribe(res => {
        this.load = false
        this.timetable = res
      })

    });
  }

  segmentChanged(event) {
    this.selectedDay = event.detail.value
  }
}

