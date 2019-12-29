import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  route: ActivatedRoute;

  constructor(route: ActivatedRoute) {
    console.log('route:', route);
    this.route = route;
   }

  ngOnInit() {
    // // From Spotify?
    // const url = document.location.href;
    // console.log('location.origin: ', url);

    // if (!url.includes('/#access_token')) { return; }

    // console.log('from spotify!');
  }

  loginClick()
  {
    const authURL = 'https://accounts.spotify.com/authorize';
    const clientID = 'f4a2ac99ea1b40a2a3d15cdcb6a455c6';
    //const redirectURI = 'http://localhost:4200';
    const redirectURI = `${document.location.protocol}//${document.location.host}`;
    const scope = 'user-read-private&user-read-email';
    const responseType = 'token';
    // const state = '1337';

    const redirectURL = `${authURL}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=${responseType}`; // &state=${state}`;

    document.location.href = redirectURL;
  }

}
