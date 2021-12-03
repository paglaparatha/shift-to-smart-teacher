import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SYLLABUS } from '../models/syllabus.model';
import { PATH } from '../utils';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.page.html',
  styleUrls: ['./syllabus.page.scss'],
})
export class SyllabusPage implements OnInit {

  syllabus: SYLLABUS[]
  path: string = PATH
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.api.onGetSyllabus().subscribe(res => {
      this.syllabus = res
    })
  }

}
