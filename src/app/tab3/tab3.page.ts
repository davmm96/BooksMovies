import { Component, ViewChild, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  type: string = '';

  constructor(public favoritesService: FavoritesService) {}

  ngOnInit()
  {
    this.segment.value='books';
    this.type = 'books';
  }

  changeType(event)
  {
    this.type = event.detail.value;
  }
}
