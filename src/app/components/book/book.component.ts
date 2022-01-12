import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/interfacesBookAll';

import { ActionSheetController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { FavoritesService } from 'src/app/services/favorites.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

  @Input() book: Book;
  @Input() isFavorite: boolean;

  constructor(private actionSheetController: ActionSheetController, 
    private favoritesService: FavoritesService, 
    private socialSharing: SocialSharing,
    private iab: InAppBrowser) { }

  ngOnInit() {}

  abrirAmazon(){
    const browser = this.iab.create(this.book.amazon_product_url,'_blank');
  }

  async mostrarMenu()
  {
      const actionSheet = await this.actionSheetController.create({
        header: 'Share',
        buttons: [{
            text: 'Twitter',
            icon: 'logo-twitter',
            handler: () => {
              this.shareTwitter();
            }
        },
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.shareFacebook();
          }
        },
        {
          text: 'Instagram',
          icon: 'logo-instagram',
          handler: () => {
            this.shareInstagram();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }]
      });

      await actionSheet.present();
    }

    addFavorite()
    {
      this.favoritesService.addFavBook(this.book);
    }

    removeFavorite()
    {
      this.favoritesService.removeFavBook(this.book);
    }

    shareTwitter()
    {
      this.socialSharing.shareViaTwitter(this.book.title, this.book.book_image).then(() => {
        // Success!
      })
    }

    shareFacebook()
    {
      this.socialSharing.shareViaFacebookWithPasteMessageHint(this.book.title, this.book.book_image).then(() => {
        // Success!
      })
    }

    shareInstagram()
    {
      this.socialSharing.shareViaInstagram(this.book.title, this.book.book_image).then(() => {
        // Success!
      })
    }

}
