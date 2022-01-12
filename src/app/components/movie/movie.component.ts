import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfacesMovies';

import { ActionSheetController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AlertController } from '@ionic/angular';

import { FavoritesService } from 'src/app/services/favorites.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie;
  @Input() isFavorite: boolean;

  constructor(private actionSheetController: ActionSheetController, 
    private favoritesService: FavoritesService, 
    private socialSharing: SocialSharing,
    private iab: InAppBrowser,
    private alert: AlertController) { }

  ngOnInit() {}

  abrirReview(){
    const browser = this.iab.create(this.movie.link.url,'_blank');
  }

  alerta() {
    this.alert.create({
      header: 'Remove favorite',
      subHeader: '',
      message: 'Are you sure you want to delete this movie from favorites?',
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

  async mostrarMenu()
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
    this.favoritesService.addFavMovie(this.movie);
  }

  removeFavorite()
  {
    this.favoritesService.removeFavMovie(this.movie);
  }

  shareTwitter()
  {
    this.socialSharing.shareViaTwitter(this.movie.display_title, this.movie.multimedia.src).then(() => {
      // Success!
    })
  }

  shareFacebook()
  {
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.movie.display_title, this.movie.multimedia.src).then(() => {
      // Success!
    })
  }

  shareInstagram()
  {
    this.socialSharing.shareViaInstagram(this.movie.display_title, this.movie.multimedia.src).then(() => {
      // Success!
    })
  }

}
