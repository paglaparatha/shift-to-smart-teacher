import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { MARKSHEET } from '../models/marksheet.model';
import { TEACHER_DATA } from '../models/teacher.model';
import { PATH, presentAlert, presentAlertConfirm } from '../utils';

@Component({
  selector: 'app-marksheets',
  templateUrl: './marksheets.page.html',
  styleUrls: ['./marksheets.page.scss'],
})
export class MarksheetsPage implements OnInit {

  user: TEACHER_DATA
  date = new Date().toISOString();
  marksheets: MARKSHEET[]
  path: string = PATH;
  fileToUpload: File = null;
  constructor(private api: ApiService, private sanitizer: DomSanitizer, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = this.api.teacher.value
    this.api.onGetMarksheets().subscribe(res => {
      this.marksheets = res
    })
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.path + url)
  }

  handleFileInput(et) {
    const files: FileList = et.files
    this.fileToUpload = files.item(0);
  }

  onAddMarksheet(form: NgForm) {
    const myForm = new FormData();
    myForm.append('class-section-subject', form.value.subject);
    myForm.append('title', form.value.title);
    myForm.append('date', form.value.date.split('T')[0]);
    myForm.append('file', this.fileToUpload, this.fileToUpload.name);
    myForm.append('marksheet', 'true');

    this.api.onPostMarksheets(myForm).subscribe(res => {
      if (res.status === 'error') {
        presentAlert(this.alertCtrl, 'Error', res.message)
      } else {
        this.api.onGetMarksheets().subscribe(res => {
          this.marksheets = res
          form.reset()
        })
      }
    })
  }

  onDelete(id) {
    presentAlertConfirm(this.alertCtrl, 'Attention', 'Are you sure you want to delete this record?', () => {
      this.api.onDeleteMarksheet(id).subscribe(res => {
        if (res.status === 'success') {
          this.api.onGetMarksheets().subscribe(res => {
            this.marksheets = res
          })
        } else {
          presentAlert(this.alertCtrl, 'Error', res.message)
        }
      })
    })
  }

}
