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
  constructor(private actionSheetController: ActionSheetController, private favoritesService: FavoritesService) { }

  ngOnInit() {}

  async mostrarMenu(){

      const actionSheet = await this.actionSheetController.create({
        buttons: [{
          text: 'Añadir a favoritos',
            icon: 'star',
            handler: () => {
              console.log('Añadir a favoritos');
              this.favoritesService.addFavBook(this.book);
            }
        }, {
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
