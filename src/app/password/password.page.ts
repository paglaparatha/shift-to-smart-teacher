import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ForgotComponent } from '../components/forgot/forgot.component';
import { presentAlert } from '../utils';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  npass1: string = ''
  npass2: string = ''
  constructor(private api: ApiService, private alerttCtrl: AlertController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onChangePassword(form: NgForm) {
    let myForm = new FormData()
    for (const key in form.value) {
      if (Object.prototype.hasOwnProperty.call(form.value, key)) {
        const element = form.value[key];
        myForm.append(key, element)
      }
    }

    myForm.append('change-password', 'true')

    this.api.onChangePassword(myForm).subscribe(res => {
      if (res.status == 'error') {
        presentAlert(this.alerttCtrl, 'Error', res.message)
      } else {
        presentAlert(this.alerttCtrl, 'Password Changed', 'Your password has been successfully changed.')
      }
      form.reset()
    })
  }

  onForgot() {
    this.modalCtrl.create({
      component: ForgotComponent
    }).then(modal => {
      modal.present()
    })
  }

}
