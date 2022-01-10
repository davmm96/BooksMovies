import { Component } from '@angular/core';
import { NytimesapiService } from '../services/nytimesapi.service';

import { ResponseListAll, List } from '../interfaces/interfacesBookAll';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  lists: List[] = [];
  constructor(private nytimesapiService: NytimesapiService) {
    this.nytimesapiService.getBooks()
    .subscribe((data: ResponseListAll) => {
      console.log(data);
      this.lists = data["results"].lists;
    });
  }

}
