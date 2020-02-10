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

  selectedPlaylist: Playlist = undefined;

  constructor(private spotifyApiService: SpotifyApiService) { }

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

    // Add first empty value
    this.selectPlaylists.push
    ({
      key: 'Select a playlist...',
      value: ''
    });

    this.playlists.forEach(element =>
    {
      if (element.Owner === this.currentUser.DisplayName) { return; }

      const keyValue = `From ${element.Owner} - ${element.Title}`;
      this.selectPlaylists.push({ key: keyValue, value: JSON.stringify(element) });
    });

    console.log('ImportPlaylist | refreshSelectPlaylists] OUT');
  }

  showSavedPlaylistsForm()
  {
    this.fromSavedListActive = true;
    this.fromURLActive = false;
    this.selectedPlaylist = undefined;
  }

  showURLForm()
  {
    this.fromSavedListActive = false;
    this.fromURLActive = true;
    this.selectedPlaylist = undefined;
  }

  selectedPlaylistChange(event: string)
  {
    console.log('ImportPlaylist - selectedPlaylistChange:', event);
    this.selectedPlaylist = event ? JSON.parse(event) : undefined;
  }


  importPlaylist() {}
}
