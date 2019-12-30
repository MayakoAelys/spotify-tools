import { TokenStatus } from './../../constants/TokenStatus';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyApiService } from '../spotify-api.service';

@Component(
{
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit
{
  route: ActivatedRoute;

  constructor(private spotifyApiService: SpotifyApiService) { }

  ngOnInit()
  {
    // // Check if we have a valid token
    // // If this is the case, change the route to Index
    // this.spotifyApiService
    //   .getTokenStatus()
    //   .then((tokenStatus: TokenStatus) =>
    //   {
    //     console.log('[login-page] tokenStatus:', tokenStatus);

    //     switch (tokenStatus)
    //     {
    //       case TokenStatus.VALID:
    //         break;

    //       case TokenStatus.EMPTY:
    //       case TokenStatus.EXPIRED:
    //       default:
    //         break;

    //     }
    //   });
  }

  loginClick()
  {
    const authURL = 'https://accounts.spotify.com/authorize';
    const clientID = 'f4a2ac99ea1b40a2a3d15cdcb6a455c6';
    // const redirectURI = 'http://localhost:4200';
    const redirectURI = `${document.location.protocol}//${document.location.host}`;
    const scope = 'user-read-private&user-read-email';
    const responseType = 'token';
    // const state = '1337';

    const redirectURL = ''.concat(
      authURL,
      '?client_id=', clientID,
      '&redirect_uri=', redirectURI,
      '&scope=', scope,
      '&response_type=', responseType
      // '&state=', state;
    );

    document.location.href = redirectURL;
  }

}
