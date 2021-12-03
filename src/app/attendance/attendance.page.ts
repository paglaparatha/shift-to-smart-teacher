import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { presentAlert } from '../utils';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  currentDate = new Date().toISOString();
  date = new Date().toISOString();
  students: {name: string, id: number, present, "id-number": string}[];
  constructor(private api: ApiService, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.api.onGetAttendanceStudents(this.currentDate.split('T')[0]).subscribe(res => {
      this.students = res;
    })
  }

  onChangeDate(e) {
    this.api.onGetAttendanceStudents(this.date.split('T')[0]).subscribe(res => {
      this.students = res;
    })
  }

  onSubmit(form: NgForm) {
    let myForm = new FormData()
    for (const key in form.value) {
      if (Object.prototype.hasOwnProperty.call(form.value, key)) {
        const element = form.value[key];
        myForm.append(key, element)
      }
    }
    myForm.append('date', this.date.split('T')[0]);
    myForm.append('counter', this.students.length.toString());
    myForm.append('take-attendance', 'true')
    this.api.onTakeAttendance(myForm).subscribe(res => {
      presentAlert(this.alertCtrl, 'Attendance Updated', 'The records have been successfully updated.')
    })
  }

}
