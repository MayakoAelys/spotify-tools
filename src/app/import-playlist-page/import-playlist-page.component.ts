import { Playlist } from './../../models/spotify/Playlist';
import { SpotifyApiService } from './../spotify-api.service';
import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { UserProfile } from 'src/models/spotify/UserProfile';

@Component({
  selector: 'app-import-playlist-page',
  templateUrl: './import-playlist-page.component.html',
  styleUrls: ['./import-playlist-page.component.scss']
})
export class ImportPlaylistPageComponent implements OnInit
{
  playlists: Array<Playlist> = new Array();
  selectPlaylists: Array<KeyValue<string, string>> = new Array();
  currentUser: UserProfile;

  fromSavedListActive: boolean = false;
  fromURLActive: boolean = false;

  constructor(private spotifyApiService: SpotifyApiService)
  {
    
  }

  ngOnInit()
  {
    console.log('ImportPlaylist | ngOnInit] IN');

    this.spotifyApiService
      .getUserProfile()
      .then(
        userProfile =>
        {
          this.currentUser = userProfile;

          this.spotifyApiService
            .getUserPlaylists()
            .then((playlists) =>
            {
              this.playlists = playlists;
              this.refreshSelectPlaylists();
            });
        });
    console.log('ImportPlaylist | ngOnInit] OUT');
  }

  refreshSelectPlaylists()
  {
    console.log('ImportPlaylist | refreshSelectPlaylists] IN');

    this.selectPlaylists = new Array();
    
    this.playlists.forEach(element => {
      if (element.Owner === this.currentUser.DisplayName) { return; }

      let keyValue = `From ${element.Owner} - ${element.Title}`;
      this.selectPlaylists.push({ key: keyValue, value: element.ID });
    });

    console.log('ImportPlaylist | refreshSelectPlaylists] OUT');
  }
}