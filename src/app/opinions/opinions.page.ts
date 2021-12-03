import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { POLLS } from '../models/polls.model';
import { presentAlert } from '../utils';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.page.html',
  styleUrls: ['./opinions.page.scss'],
})
export class OpinionsPage implements OnInit {

  polls: POLLS[];
  constructor(private api: ApiService, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.api.onGetOpinions().subscribe(res => {
      this.polls = res
    })
  }

  onSubmit(form: NgForm) {
    const myForm = new FormData()
    myForm.append('opt', form.value.opt)
    myForm.append('opinion', 'true')

    this.api.onPostOpinions(myForm).subscribe(res => {
      if (res.status === 'error') {
        presentAlert(this.alertCtrl, 'Error', res.message)
      } else {
        this.api.onGetOpinions().subscribe(res => {
          this.polls = res

        })
      }
    })
  }

}
