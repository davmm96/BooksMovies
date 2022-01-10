import { Component, OnInit } from '@angular/core';
import { NytimesapiService } from '../services/nytimesapi.service';

import { ResponseMovies, Movie } from '../interfaces/interfacesMovies';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  movies: Movie[] = [];

  constructor(private nytimesapiService: NytimesapiService) {
    
  }

  ngOnInit() {
      this.loadFilms();
  }

  loadFilms( event?){
    this.nytimesapiService.getFilms()
    .subscribe((data: ResponseMovies) => {
      console.log(data);

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

  getContent() {
    return document.querySelector('ion-content');
  }

  scrollToTop() {
    this.getContent().scrollToTop(500);
  }

}
