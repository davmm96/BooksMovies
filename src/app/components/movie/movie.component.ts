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
        text: 'Eliminar de favoritos',
          icon: 'trash',
          handler: () => {
            console.log('Eliminado de favoritos');
            this.favoritesService.removeFavMovie(this.movie);
          }
      }
    }
    else
    {
      guardarBorrarFavorito = {
        text: 'Añadir a favoritos',
          icon: 'star',
          handler: () => {
            console.log('Añadir a favoritos');
            this.favoritesService.addFavMovie(this.movie);
          }
      }
    }
    const actionSheet = await this.actionSheetController.create({
      buttons: [guardarBorrarFavorito, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }

}
