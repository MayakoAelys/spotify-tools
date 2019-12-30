import { IconTypes } from './../../constants/IconTypes';
import { Component, OnInit, Input } from '@angular/core';
import { StorageKeys } from 'src/constants/StorageKeys';
import localforage from 'localforage';
import { MenuCard } from 'src/models/MenuCard';

@Component(
{
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})

export class IndexPageComponent implements OnInit
{
  username: string = 'username';
  menuCards: Array<MenuCard> = new Array<MenuCard>();

  private _userProfile;

  @Input('userProfile')
  set userProfile(userProfile: any)
  {
    console.warn('userProfile setter, userProfile:', userProfile);
    this._userProfile = userProfile;
    this.updateProfile();
  }

  constructor()
  {
    // Set menu cards values
    this.menuCards.push(
    {
      Icon: IconTypes.DeleteSweep,
      Description: 'Remove duplicate songs from a playlist'
    });

    this.menuCards.push(
      {
        Icon: IconTypes.ImportPlaylist,
        Description: 'Import a playlist to your playlists'
      });
  }

  ngOnInit() { this.updateProfile(); }

  // TODO - Factorize (see navbar.component.ts)
  updateProfile()
  {
    console.warn('updateProfile called, userProfile: ', this._userProfile);
    console.warn('this.username: ', this.username);

    if (!this._userProfile)
    {
      this.username = 'Anonymous';
    }
    else
    {
      this.username = this._userProfile.display_name;
      console.warn('this.username: ', this.username);
    }
  }

  disconnectClick()
  {
    localforage
      .removeItem(StorageKeys.SpotifyToken)
      .then(() =>
      {
        document.location.href = '/';
      });
  }
}
