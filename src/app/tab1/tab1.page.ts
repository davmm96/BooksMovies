import { Component } from '@angular/core';
import { NytimesapiService } from '../services/nytimesapi.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  lists = [];
  constructor(private nytimesapiService: NytimesapiService) {
    this.nytimesapiService.getBooks()
    .subscribe((data) => {
      console.log(data);
      this.lists = data["results"].lists;
    });
  }

}
