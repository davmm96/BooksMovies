import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    BookComponent,
    BooksComponent,
    MovieComponent,
    MoviesComponent,
    ListsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MoviesComponent,
    ListsComponent,
    BooksComponent
  ]
})
export class ComponentsModule { }
