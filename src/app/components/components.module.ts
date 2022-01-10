import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';



@NgModule({
  declarations: [
    BookComponent,
    BooksComponent,
    MovieComponent,
    MoviesComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MoviesComponent
  ]
})
export class ComponentsModule { }
