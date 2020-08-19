import { UserProfile } from './../../../models/spotify/UserProfile';
import { RoutesPath } from './../../../constants/RoutesPath';
import { SpotifyApiService } from './../../spotify-api.service';
import { IconTypes } from './../../../constants/IconTypes';
import { Component, OnInit, Input } from '@angular/core';
import { StorageKeys } from 'src/constants/StorageKeys';
import localforage from 'localforage';
import { MenuCard } from 'src/models/MenuCard';
import { Router } from '@angular/router';

@Component(
{
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})

export class IndexPageComponent implements OnInit
{
  private _userProfile: UserProfile;

  username: string = '';
  menuCards: Array<MenuCard> = new Array<MenuCard>();

  // @Input('userProfile')
  set userProfile(userProfile: UserProfile)
  {
    // console.warn('userProfile setter, userProfile:', userProfile);

    this._userProfile = userProfile;
    this.updateProfile();
  }

  constructor(
    private router: Router,
    private spotifyApiService: SpotifyApiService)
  {
    // Set menu cards values
    this.menuCards.push(
    {
      RouterLink: RoutesPath.RemoveDuplicate.Path,
      Icon: IconTypes.DeleteSweep,
      Description: 'Remove duplicate songs from a playlist'
    });

    this.menuCards.push(
      {
        RouterLink: RoutesPath.ImportPlaylist.Path,
        Icon: IconTypes.ImportPlaylist,
        Description: 'Import a playlist to your playlists'
      });
  }

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
      });
  }

  // TODO - Factorize (see navbar.component.ts)
  updateProfile()
  {
    // console.warn('updateProfile called, userProfile: ', this._userProfile);
    // console.warn('this.username: ', this.username);

    if (!this._userProfile)
    {
      this.username = 'Anonymous';
    }
    else
    {
      this.username = this._userProfile.DisplayName;
      // console.warn('this.username: ', this.username);
    }
  }

  disconnectClick()
  {
    localforage
      .clear()
      .then(() =>
      {
        console.log('disconnectClick() redirect');
        document.location.href = '/';
      });
  }
}
