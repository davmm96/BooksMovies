import { Component, ViewChild } from '@angular/core';
import { NytimesapiService } from '../services/nytimesapi.service';
import { IonContent } from '@ionic/angular';

import { ResponseListAll, List } from '../interfaces/interfacesBookAll';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonContent) content: IonContent;

  lists: List[] = [];
  constructor(private nytimesapiService: NytimesapiService) {
    this.nytimesapiService.getBooks()
    .subscribe((data: ResponseListAll) => {
      this.lists = data["results"].lists;
    });
  }

  scrollToTop() {
    this.content.scrollToTop(500);
  }

}
