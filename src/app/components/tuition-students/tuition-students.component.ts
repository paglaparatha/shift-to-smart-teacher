import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { TUITION } from 'src/app/models/tuition.model';
import { PATH } from 'src/app/utils';

@Component({
  selector: 'app-tuition-students',
  templateUrl: './tuition-students.component.html',
  styleUrls: ['./tuition-students.component.scss'],
})
export class TuitionStudentsComponent implements OnInit {

  @Input() tuition: TUITION;
  path: string = PATH
  students: { "class": number, id: number, image: string, name: string, section: string }[]
  constructor(private api: ApiService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.api.onGetTuitionStudents(this.tuition._id).subscribe(res => {
      this.students = res
    })
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel')
  }

}
