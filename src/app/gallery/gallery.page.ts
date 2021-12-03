import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { PhotoComponent } from '../components/photo/photo.component';
import { PATH } from '../utils';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  gallery;
  grid = true;
  path = PATH;
  constructor(private api: ApiService, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.api.onGetGallery().subscribe(res => {
      this.gallery = res;
    })
  }

  segmentChanged(event) {
    if (event.detail.value === 'grid') {
      this.grid = true
    } else {
      this.grid = false
    }
  }

  viewImg(img) {
    this.modalCtrl.create({
      component: PhotoComponent,
      componentProps: { img }
    }).then(modal => modal.present())
  }

}
