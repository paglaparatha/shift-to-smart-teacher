import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { presentAlert } from 'src/app/utils';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {

  state: 'email' | 'otp' | 'password' = 'email';
  email = '';
  otp = '';
  npass1 = '';
  npass2 = '';
  constructor(private modalCtrl: ModalController, private api: ApiService, private alertCtrl: AlertController) { }

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel')
  }

  onSubmitEmail() {
    let myForm = new FormData()
    myForm.append('email', this.email);
    myForm.append('forgot-1', 'true')
    this.api.onForgot(myForm).subscribe(res => {
      if (res.status === 'error') {
        presentAlert(this.alertCtrl, 'Error', res.message)
      } else {
        this.state = 'otp';
      }
    })
  }

  onSubmitOTP() {
    let myForm = new FormData()
    myForm.append('email', this.email);
    myForm.append('otp', this.otp);
    myForm.append('forgot-2', 'true')
    this.api.onForgot(myForm).subscribe(res => {
      if (res.status === 'error') {
        presentAlert(this.alertCtrl, 'Error', res.message)
      } else {
        this.state = 'password';
      }
    })
  }

  onSubmitPassword() {
    let myForm = new FormData()
    myForm.append('email', this.email);
    myForm.append('otp', this.otp);
    myForm.append('npass1', this.npass1);
    myForm.append('npass2', this.npass2);
    myForm.append('forgot-3', 'true')
    this.api.onForgot(myForm).subscribe(res => {
      if (res.status === 'error') {
        presentAlert(this.alertCtrl, 'Error', res.message)
      } else {
        this.modalCtrl.dismiss(null, 'cancel')
        presentAlert(this.alertCtrl, 'Password Changed', 'Your password has been successfully changed.')
      }
    })
  }

}
