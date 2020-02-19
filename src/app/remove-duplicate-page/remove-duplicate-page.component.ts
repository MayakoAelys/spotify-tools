import { Playlist } from './../../models/spotify/Playlist';
import { SpotifyApiService } from './../spotify-api.service';
import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { UserProfile } from 'src/models/spotify/UserProfile';
import { Track } from 'src/models/spotify/Track';

@Component({
  selector: 'app-remove-duplicate-page',
  templateUrl: './remove-duplicate-page.component.html',
  styleUrls: ['./remove-duplicate-page.component.scss']
})

export class RemoveDuplicatePageComponent implements OnInit
{
  currentUser: UserProfile;

  playlists: Playlist[];
  selectedPlaylist: Playlist;
  selectPlaylists: Array<KeyValue<string, string>> = new Array();

  debug: string;

  constructor(private spotifyApiService: SpotifyApiService) { }

  async ngOnInit()
  {
    console.log('[RemoveDuplicatePage | ngOnInit] IN');

    this.currentUser = await this.spotifyApiService.getUserProfile();
    this.playlists   = await this.spotifyApiService.getUserPlaylists();

    this.refreshSelectPlaylists();

    console.log('[RemoveDuplicatePage | ngOnInit] OUT');
  }


  //#region Functions

  private refreshSelectPlaylists()
  {
    this.selectPlaylists = new Array();

    // Empty value
    this.selectPlaylists.push
    ({
      key: 'Select a playlist...',
      value: ''
    });

    this.playlists.forEach(element =>
    {
      if (element.Owner !== this.currentUser.DisplayName) { return; }

      const keyValue = element.Title;
      this.selectPlaylists.push({ key: keyValue, value: JSON.stringify(element) });
    });
  }

  //#endregion


  //#region Events

  async selectedPlaylistChange(event: string)
  {
    this.selectedPlaylist = event ? JSON.parse(event) : undefined;

    if (!this.selectedPlaylist)
      return;

    // Get songs to detect duplicates
    let tracks = await this.spotifyApiService.getPlaylistTracks(this.selectedPlaylist.ID);
    let uniqueTracks: Track[] = [];
    let dupeTracks: Track[] = []; // temp

    for (const elem of tracks)
    {
      const alreadyExists = uniqueTracks.filter(t => t.ID === elem.ID).length !== 0;
  
      if (alreadyExists)
        dupeTracks.push(elem);
      else
        uniqueTracks.push(elem);
    }

    console.log(tracks, uniqueTracks, dupeTracks);
  }

  //#endregion
}
