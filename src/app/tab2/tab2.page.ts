import { Component, OnInit, ViewChild } from '@angular/core';
import { NytimesapiService } from '../services/nytimesapi.service';
import { IonContent } from '@ionic/angular';

import { ResponseMovies, Movie } from '../interfaces/interfacesMovies';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonContent) content: IonContent;
  movies: Movie[] = [];

  constructor(private nytimesapiService: NytimesapiService) {}

  ngOnInit() 
  {
      this.loadFilms();
  }

  loadFilms(event?){
    this.nytimesapiService.getFilms()
    .subscribe((data: ResponseMovies) => {

      if(data["results"].length === 0)
      {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.movies.push(...data["results"]);

      if(event)
      {
        event.target.complete();
      }
    });
  }

  loadData(event)
  {
    this.loadFilms(event);
  }

  scrollToTop() {
    this.content.scrollToTop(500);
  }

}
