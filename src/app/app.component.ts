import { RoutePath } from './../models/RoutePath';
import { RoutesPath } from './../constants/RoutesPath';
import { TokenStatus } from './../constants/TokenStatus';
import { Component } from '@angular/core';
import localforage from 'localforage';
import { StorageKeys } from '../constants/StorageKeys';
import { HttpClient } from '@angular/common/http';
import { SpotifyApiService } from './spotify-api.service';
import { Router } from '@angular/router';

@Component(
{
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent
{
  title = 'spotify-tools';
  userProfile = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private spotifyApiService: SpotifyApiService)
  {
    console.log('[app-component | ngOnInit] current url:', document.location);
    console.log('[app-component | ngOnInit] current pathname:', document.location.pathname);
    console.log('[app-component | ngOnInit] current hash:', document.location.hash);

    // Extract route and get the routePath object
    const route: string        = document.location.pathname.split('/')[1]; // e.g.: '', 'Index', 'Login', etc
    const routePath: RoutePath = route ? RoutesPath[route] : RoutesPath.Root.Path;

    // TODO remove me
    console.error('route:', route);
    console.error('routePath:', routePath);

    if (document.location.hash.startsWith(RoutesPath.FromSpotify.Path))
    {
      this.handleSpotifyLogin(document.location.hash);
      return;
    }

    // Check if we have a valid token
    // If this is the case, change the route to Index
    this.spotifyApiService
      .getTokenStatus()
      .then((tokenStatus: TokenStatus) =>
      {
        console.log('[app-component | ngOnInit] tokenStatus:', tokenStatus);

        switch (tokenStatus)
        {
          case TokenStatus.VALID:
            // // Get user profile
            // this.spotifyApiService
            //   .getUserProfile()
            //   .then((userProfile) =>
            //   {
            //     this.userProfile = userProfile;

            if (!route) { this.router.navigate([RoutesPath.Index.Path]); }
              // });
            break;

          case TokenStatus.EMPTY:
          case TokenStatus.EXPIRED:
          default:
            if (routePath.TokenRequired || !route) { this.router.navigate([RoutesPath.Login.Path]); }
            break;
        }
      });
      // .finally(() =>
      // {
      //   this.showApp = true;
      // });
  }

  private handleSpotifyLogin(hash: string): void
  {
    console.log('[app.component - handleSpotifyLogin] IN');

    // Extract token
    // url example:
    // tslint:disable-next-line:max-line-length
    // http://localhost:4200/#access_token=BQC-Z-eo00J1bU6LKIwPX9T2698rJFahlS5av3WwnWCh9pQP1IToQrPpl8qFOZRVYyaqhVJeAV_cIiAgGlvmJQmc2bDYydGkDSqt6WOXlRN6wfrCanUeRefMfU_gnfNxMWwpfSfQa9InXmXCTnmG0_Uoon2mBX3QQjZd4YvRNJ-83btP&token_type=Bearer&expires_in=3600
    const urlParams = hash.split('#')[1];
    const params    = urlParams.split('&');

    const hashAccessToken = params[0].split('=')[1];
    const hashTokenType   = params[1].split('=')[1];
    const hashExpiresIn   = params[2].split('=')[1];

    console.log('hashAccessToken:', hashAccessToken);
    console.log('hashTokenType:', hashTokenType);
    console.log('hashExpiresIn:', hashExpiresIn);

    // Save token in local storage
    localforage
      .setItem(StorageKeys.SpotifyToken, hashAccessToken)
      .then((newToken) =>
      {
         console.log('new token saved', newToken);
         console.log('redirecting');

         this.router.navigate([RoutesPath.Index.Path]);

         console.log('[app.component.ts] constructor OUT');
      });

    console.log('[app.component - handleSpotifyLogin] OUT');
  }
}
