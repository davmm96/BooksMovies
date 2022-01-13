import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfacesMovies';

import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { FavoritesService } from 'src/app/services/favorites.service';

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
    private inAppBrowser: InAppBrowser,
    private alert: AlertController) { }

  ngOnInit() {}

  openReview(){
    const browser = this.inAppBrowser.create(this.movie.link.url,'_blank');
  }

  showAlert() {
    this.alert.create({
      header: 'Delete favorite',
      subHeader: '',
      message: 'Are you sure you want to delete this movie from your favorites?',
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
    this.favoritesService.addFavMovie(this.movie);
  }

  removeFavorite()
  {
    this.favoritesService.removeFavMovie(this.movie);
  }

  shareTwitter()
  {
    this.socialSharing.shareViaTwitter(this.movie.display_title, this.movie.multimedia.src);
  }

  shareFacebook()
  {
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.movie.display_title, this.movie.multimedia.src);
  }

  shareInstagram()
  {
    this.socialSharing.shareViaInstagram(this.movie.display_title, this.movie.multimedia.src);
  }
}
