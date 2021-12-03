import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ForgotComponent } from '../components/forgot/forgot.component';
import { presentAlert } from '../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading = false
  constructor(private api: ApiService, private alertCtrl: AlertController, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    let myForm = new FormData()
    myForm.append('email', form.value.email)
    myForm.append('password', form.value.password)
    myForm.append('login', 'true')
    this.loading = true
    this.api.onLogin(myForm).subscribe(res => {
      if (res.body.status == 'success') {
        this.api.key = res.headers.get('Bearer')
        this.api.onGetTeacher().subscribe(res => {
          this.loading = false
          this.router.navigate(['/home'])
        })
      } else {
        presentAlert(this.alertCtrl, 'Error', res.body.message)
        form.reset()
        this.loading = false
      }
    })
  }

  onForgot() {
    this.modalCtrl.create({
      component: ForgotComponent
    }).then(m => m.present())
  }

}
