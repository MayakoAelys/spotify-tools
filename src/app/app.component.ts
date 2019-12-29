import { Component } from '@angular/core';
import localforage from "localforage";
import { StorageKeys } from "../constants/StorageKeys";
import { HttpClient } from "@angular/common/http";
import { SpotifyApiService } from './spotify-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'spotify-tools';
  showLogin = false;
  showApp = false;
  userProfile = null;

  constructor(
    private httpClient: HttpClient,
    private spotifyApiService: SpotifyApiService) {
    
    console.log('[app.component.ts] constructor IN');
    this.showLogin = false;
    this.showApp = false;

    localforage.getItem(StorageKeys.SpotifyToken).then((dbValue) => {
      if (!dbValue && !url.includes('/#access_token')) {
        console.log('No spotify token, showing app-login');
        this.showLogin = true;
        return;
      }

      // Check if the token is still valid
      this.spotifyApiService.getUserProfile().then((userProfile) => {
        console.log('userProfile (then):', userProfile);
        this.userProfile = userProfile;
        this.showLogin = false;
        this.showApp = true;
      })
      .catch((error) => {
        console.error('getUserProfile catch error:', error);
        this.showApp = false;
        this.showLogin = true;
      });
    });

    // From Spotify?
    const url = document.location.href;
    console.log('current url: ', url);

    if (!url.includes('/#access_token')) { return; }

    console.log('from spotify!');

    // Extract token
    // e.g.: http://localhost:4200/#access_token=BQC-Z-eo00J1bU6LKIwPX9T2698rJFahlS5av3WwnWCh9pQP1IToQrPpl8qFOZRVYyaqhVJeAV_cIiAgGlvmJQmc2bDYydGkDSqt6WOXlRN6wfrCanUeRefMfU_gnfNxMWwpfSfQa9InXmXCTnmG0_Uoon2mBX3QQjZd4YvRNJ-83btP&token_type=Bearer&expires_in=3600
    var urlParams = url.split('#')[1];
    var params = urlParams.split('&');
    
    var urlAccessToken = params[0].split('=')[1];
    var urlTokenType = params[1].split('=')[1];
    var urlExpiresIn = params[2].split('=')[1];

    console.log('urlAccessToken:', urlAccessToken);
    console.log('urlTokenType:', urlTokenType);
    console.log('urlExpiresIn:', urlExpiresIn);

    // Save token in local storage
    localforage
      .setItem(StorageKeys.SpotifyToken, urlAccessToken)
      .then((newToken) => {
         console.log('new token saved', newToken);
         console.log('redirecting');

         document.location.href = '/';

         console.log('[app.component.ts] constructor OUT');
      });
  }
}
