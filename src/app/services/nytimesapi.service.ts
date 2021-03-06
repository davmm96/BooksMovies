import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import{ ResponseListAll } from '../interfaces/interfacesBookAll';
import { ResponseMovies } from '../interfaces/interfacesMovies';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NytimesapiService {

  offsetBooks = -20;
  constructor(private http: HttpClient) { }

  getBooks()
  {
    return this.http.get<ResponseListAll>(apiUrl+'svc/books/v3/lists/overview.json?api-key='+apiKey);
  }
  
  getFilms()
  {
    this.offsetBooks+=20;
    return this.http.get<ResponseMovies>(apiUrl+`svc/movies/v2/reviews/picks.json?offset=${this.offsetBooks}&api-key=`+apiKey);
  }
}
