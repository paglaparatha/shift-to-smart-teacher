import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { presentAlertConfirm } from '../utils';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  messages;
  constructor(private api: ApiService, private alertCTRL: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.api.onGetMessages().subscribe(res => {
      this.messages = res
    })
  }

  onDelete(id: number) {
    presentAlertConfirm(this.alertCTRL, 'Attention', 'Are you sure you want to delete this message?', () => {
      this.api.onDeleteMSG(id).subscribe(res => {
        if (res.status == 'success') {
          this.api.onGetMessages().subscribe(res => {
            this.messages = res
          })
        }
      })
    })
  }

  doRefresh(event) {
    this.api.onGetMessages().subscribe(res => {
      event.target.complete();
    })
  }

}
