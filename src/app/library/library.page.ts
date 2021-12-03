import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  page = 0;
  library;
  search: string;
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getData()
  }

  getData(e = null) {
    this.page++;
    let form = new FormData()
    form.append('page', this.page.toString())
    if (this.search) {
      form.append('search', this.search);
    }
    form.append('library', 'true')
    this.api.onGetLibrary(form).subscribe(res => {
      if (e) {
        e.target.complete()
      }
      if (this.library) {
        this.library.books = [...this.library.books, ...res['books']]
      } else {
        this.library = res
      }
    })
  }

  loadData(e) {
    if (this.library.pages >= this.page) {
      this.getData(e)
    } else {
      e.target.disabled = true;
    }
  }

}
