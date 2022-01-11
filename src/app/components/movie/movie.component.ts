import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfacesMovies';

import { ActionSheetController } from '@ionic/angular';

import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie;
  @Input() isFavorite;

  constructor(private actionSheetController: ActionSheetController, private favoritesService: FavoritesService) { }

  ngOnInit() {}

  async mostrarMenu(){

    let guardarBorrarFavorito;

    if(this.isFavorite)
    {
      guardarBorrarFavorito = {
        text: 'Remove from favoritos',
          icon: 'trash',
          handler: () => {
            this.favoritesService.removeFavMovie(this.movie);
          }
      }
    }
    else
    {
      guardarBorrarFavorito = {
        text: 'Add to favorites',
          icon: 'heart',
          handler: () => {
            this.favoritesService.addFavMovie(this.movie);
          }
      }
    }
    const actionSheet = await this.actionSheetController.create({
      buttons: [guardarBorrarFavorito, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });

    await actionSheet.present();
  }

}
