import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Book } from '../interfaces/interfacesBookAll';
import { Movie } from '../interfaces/interfacesMovies';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favBooks: Book[] = [];
  favMovies: Movie[] = [];

  constructor(private toastController: ToastController) { 
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
    const isAdded = this.favBooks.find( b => b.primary_isbn10 === book.primary_isbn10);
    
    if(!isAdded)
    {
      this.favBooks.unshift(book);
      localStorage.setItem('favBooks', JSON.stringify(this.favBooks));
      
      this.showToast('Book added to favorites');
    }
    else
    {
      this.showToast('This book is already added');
    }
  }
  
  addFavMovie(movie: Movie)
  {
    const isAdded = this.favMovies.find(m => m.display_title === movie.display_title);
    
    if(!isAdded)
    {
      this.favMovies.unshift(movie);
      localStorage.setItem('favMovies', JSON.stringify(this.favMovies));

      this.showToast('Movie added to favorites');
    }
    else
    {
      this.showToast('This movie is already added');
    }
  }

  removeFavMovie(movie: Movie)
  {
    this.favMovies = this.favMovies.filter(m => m.display_title !== movie.display_title);
    localStorage.setItem('favMovies', JSON.stringify(this.favMovies));

    this.showToast('Movie removed from favorites');
  }
  
  removeFavBook(book: Book)
  {
    this.favBooks = this.favBooks.filter(b => b.primary_isbn10  !== book.primary_isbn10);
    localStorage.setItem('favBooks', JSON.stringify(this.favBooks));
    this.showToast('Book removed from favorites');
  }

  async showToast(message: string)
  {
    const toast = await this.toastController.create({
      message: message,
      duration: 1200
    });
    toast.present();
  }
}


