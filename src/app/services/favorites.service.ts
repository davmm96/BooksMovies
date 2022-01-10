import { Injectable } from '@angular/core';
import { Book } from '../interfaces/interfacesBookAll';
import { Movie } from '../interfaces/interfacesMovies';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favBooks: Book[] = [];
  favMovies: Movie[] = [];
  constructor() { 
    this.loadFavs();
  }

  loadFavs()
  {
    const favBooks = localStorage.getItem('favBooks');
    const favMovies =localStorage.getItem('favMovies');

    if(favBooks)
    {
      this.favBooks = JSON.parse(favBooks);
    }

    if(favMovies)
    {
      this.favMovies = JSON.parse(favMovies);
    }
  }

  addFavBook(book: Book)
  {
    this.favBooks.unshift(book);
    localStorage.setItem('favBooks', JSON.stringify(this.favBooks));
  }
  
  addFavMovie(movie: Movie)
  {
    this.favMovies.unshift(movie);
    localStorage.setItem('favMovies', JSON.stringify(this.favMovies));
  }

  removeFavMovie(movie: Movie)
  {
    this.favMovies = this.favMovies.filter(m => m.display_title !== movie.display_title);
    localStorage.setItem('favMovies', JSON.stringify(this.favMovies));
  }

  removeFavBook(book: Book)
  {
    this.favBooks = this.favBooks.filter(b => b.primary_isbn10  !== book.primary_isbn10);
    localStorage.setItem('favBooks', JSON.stringify(this.favBooks));
  }

}


