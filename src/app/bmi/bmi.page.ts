import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.page.html',
  styleUrls: ['./bmi.page.scss'],
})
export class BmiPage implements OnInit {

  BMI: number
  constructor() { }

  ngOnInit() {
  }

  calculateBMI(form: NgForm) {
    let height = +form.value.height/100
    let weight = +form.value.weight

    this.BMI = Math.round((weight/(height*height) + Number.EPSILON) * 100) / 100
  }
}
