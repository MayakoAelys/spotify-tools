import { RoutesPath } from './../../constants/RoutesPath';
import { SpotifyApiService } from './../spotify-api.service';
import { UserProfile } from './../../models/spotify/UserProfile';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component(
{
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit
{
  private _userProfile: UserProfile;
  username: string;
  avatarURL: string;

  @Input('userProfile')
  set userProfile(userProfile: UserProfile)
  {
    console.warn('userProfile setter, userProfile:', userProfile);
    this._userProfile = userProfile;
    this.updateProfile();
  }


  constructor(
    private router: Router,
    private spotifyApiService: SpotifyApiService) { }

  ngOnInit()
  {
    // Get user profile
    this.spotifyApiService
      .getUserProfile()
      .then((userProfile) =>
      {
        this.userProfile = userProfile;
      })
      .catch((err) =>
      {
        console.warn('Error when retrieving userProfile:', err);

        // TODO - Factorize (see app.component.ts)
        const route: string        = document.location.pathname.split('/')[1]; // e.g.: '', 'Index', 'Login', etc

        if (!route || route === RoutesPath.Login.Path) { return; }

        this.router.navigate([RoutesPath.Root.Path]);
      });
   }

  updateProfile()
  {
    console.warn('updateProfile called, userProfile: ', this._userProfile);

    // TODO - Factorize (see index-page.component.ts)
    if (!this._userProfile)
    {
      this.username = 'Anonymous';
      this.avatarURL = '/assets/default_avatar.jpg';
    }
    else
    {
      this.username = this._userProfile.DisplayName;
      this.avatarURL = this._userProfile.AvatarURL;
    }
  }
}
