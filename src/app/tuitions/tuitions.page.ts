import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { TUITION } from '../models/tuition.model';
import { DomSanitizer } from '@angular/platform-browser';
import { PATH } from '../utils';
import { ModalController } from '@ionic/angular';
import { TuitionStudentsComponent } from '../components/tuition-students/tuition-students.component';

@Component({
  selector: 'app-tuitions',
  templateUrl: './tuitions.page.html',
  styleUrls: ['./tuitions.page.scss'],
})
export class TuitionsPage implements OnInit {

  tuitions: TUITION[]
  path: string = PATH
  constructor(private api: ApiService, private sanitizer: DomSanitizer, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.api.onGetTuitions().subscribe(res => {
      this.tuitions = res
    })
  }

  getSafeUrl(url: string) {
    return  this.sanitizer.bypassSecurityTrustResourceUrl(this.path + url)
  }

  onViewStudents(tuition) {
    this.modalCtrl.create({
      component: TuitionStudentsComponent,
      componentProps: {tuition},
    }).then(modal => modal.present())
  }

}
