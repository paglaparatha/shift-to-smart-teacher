import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { REQUESTS } from '../models/request.model';
import { presentAlertConfirm } from '../utils';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {

  requests: REQUESTS[]
  constructor(private api: ApiService, private alertCTRL: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.onGetRequests()

    this.api.onResetNotificationCount('request');
  }

  onGetRequests() {
    this.api.onGetRequest().subscribe(res => {
      this.requests = res
    })
  }

  onAcceptRequest(id: number, index: number) {
    presentAlertConfirm(this.alertCTRL, 'Attention', 'Are you sure you want to accept this request?', () => {
      this.api.onAcceptRequest(id).subscribe(res => {
        if (res.status === 'success') {
          this.requests.splice(index, 1)
        }
      })
    })
  }

  onRejectRequest(id: number, index: number) {
    presentAlertConfirm(this.alertCTRL, 'Attention', 'Are you sure you want to reject this request?', () => {
      this.api.onRejectRequest(id).subscribe(res => {
        if (res.status === 'success') {
          this.requests.splice(index, 1)
        }
      })
    })
  }

  // onDeleteRequests(id: number) {
  //   presentAlertConfirm(this.alertCTRL, 'Attention', 'Are you sure you want to delete this request? This would indicate that the request has been fulfilled.', () => {
  //     this.api.onDeleteRequest(id).subscribe(res => {
  //       if (res.status == 'success') {
  //         this.onGetRequests()
  //       }
  //     })
  //   })
  // }

}
