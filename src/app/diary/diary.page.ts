import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { SUBJECT } from '../models/subjects.model';
import { PATH, presentAlert, presentAlertConfirm } from '../utils';
import { DomSanitizer } from '@angular/platform-browser';
import { DIARY } from '../models/diary.model';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  subjects: SUBJECT[]
  path: string = PATH;
  fileToUpload: File = null;
  diary: DIARY[]
  constructor(private api: ApiService, private alertCtrl: AlertController, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.api.onGetFacultySubjects().subscribe(res => {
      this.subjects = res
      this.onGetDiary()
    })
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.path + url)
  }

  onGetDiary() {
    this.api.onGetDiary().subscribe(res => {
      this.diary = res
    })
  }

  handleFileInput(et) {
    const files: FileList = et.files
    this.fileToUpload = files.item(0);
  }

  onUploadDiary(form: NgForm) {
    const myForm = new FormData();
    for (const key in form.value) {
      if (Object.prototype.hasOwnProperty.call(form.value, key)) {
        const element = form.value[key];
        myForm.append(key, element)
      }
    }

    if (this.fileToUpload) {
      myForm.append('file', this.fileToUpload, this.fileToUpload.name);
    }
    myForm.append('diary', 'true');

    this.api.onUploadDiary(myForm).subscribe(res => {
      if (res.status === 'error') {
        presentAlert(this.alertCtrl, 'Error', res.message)
      } else {
        form.reset()
        this.fileToUpload = null
        this.onGetDiary()
      }
    })
  }

  onDeleteDiary(_id) {
    presentAlertConfirm(this.alertCtrl, 'Attention', 'Are you sure you want to delete this record?', () => {
      this.api.onDeleteDiary(_id).subscribe(res => {
        if (res.status === 'error') {
          presentAlert(this.alertCtrl, 'Error', res.message)
        } else {
          this.onGetDiary()
        }
      })
    })
  }

}
