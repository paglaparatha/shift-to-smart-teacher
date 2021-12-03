import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { NOTICE } from 'src/app/models/notice.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PATH } from 'src/app/utils';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  n_id: number
  notice: NOTICE
  fileUrl: SafeResourceUrl
  path: string = PATH
  constructor(private api: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      this.n_id = +params.get('id')
      this.api.onGetNoticeDetails(this.n_id).subscribe(res => {
        this.notice = res
      })
    })
  }

  getSafeUrl(url: string) {
    return  this.sanitizer.bypassSecurityTrustResourceUrl(this.path + url)
  }

}
