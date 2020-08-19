import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyApiService } from '../../spotify-api.service';

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

  ngOnInit() { }

  loginClick()
  {
    const authURL = 'https://accounts.spotify.com/authorize';
    const clientID = 'f4a2ac99ea1b40a2a3d15cdcb6a455c6';
    const redirectURI = `${document.location.protocol}//${document.location.host}`;
    const scopeList = [
      // User
      'user-read-email',
      'user-read-private',

      // Playlist
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-read-private',
      'playlist-modify-private'
    ];
    const responseType = 'token';

    // Construct scope string
    let scope = '';

    for (let i = 0; i < scopeList.length; i++)
    {
      const scopeItem = scopeList[i];

      scope += scopeItem;

      if (i < scopeList.length - 1) { scope += ' '; }
    }

    const redirectURL = ''.concat(
      authURL,
      '?client_id=', clientID,
      '&redirect_uri=', redirectURI,
      '&scope=', scope,
      '&response_type=', responseType
    );

    // console.log('loginClick() redirect');
    document.location.href = redirectURL;
  }

}
