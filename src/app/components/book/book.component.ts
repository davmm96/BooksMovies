import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/interfacesBookAll';

import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { FavoritesService } from 'src/app/services/favorites.service';

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
    private inAppBrowser: InAppBrowser,
    public alert: AlertController) { }

  ngOnInit() {}

  openAmazon(){
    const browser = this.inAppBrowser.create(this.book.amazon_product_url,'_blank');
  }

  showAlert() {
    this.alert.create({
      header: 'Remove favorite',
      subHeader: '',
      message: 'Are you sure you want to delete this book from favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          cssClass: 'red_alert',
          handler: () => {
            this.removeFavorite();
          }
        }
      ]
    }).then(res => {

      res.present();

    });
  }

  async showSocial()
  {
      const actionSheet = await this.actionSheetController.create({
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
          icon: '',
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
      this.socialSharing.shareViaTwitter(this.book.title, this.book.book_image);
    }

    shareFacebook()
    {
      this.socialSharing.shareViaFacebookWithPasteMessageHint(this.book.title, this.book.book_image);
    }

    shareInstagram()
    {
      this.socialSharing.shareViaInstagram(this.book.title, this.book.book_image);
    }
}