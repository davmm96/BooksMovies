import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NytimesapiService {

  offset = -20;
  constructor(private http: HttpClient) { }

  getBooks()
  {
    return this.http.get(apiUrl+'svc/books/v3/lists/overview.json?api-key='+apiKey);
  }
  
  getFilms()
  {
    this.offset+=20;
    return this.http.get(apiUrl+`svc/movies/v2/reviews/picks.json?offset=${this.offset}&api-key=`+apiKey);
  }
}
