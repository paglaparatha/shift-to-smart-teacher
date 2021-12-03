import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PATH } from 'src/app/utils';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {

  @Input() img;
  path: string = PATH
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel')
  }

}
