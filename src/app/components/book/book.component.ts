import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/interfacesBookAll';

import { ActionSheetController } from '@ionic/angular';

import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

  @Input() book: Book;
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
            this.favoritesService.removeFavBook(this.book);
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
            this.favoritesService.addFavBook(this.book);
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
