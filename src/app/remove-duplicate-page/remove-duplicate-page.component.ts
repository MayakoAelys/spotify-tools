import { Playlist } from './../../models/spotify/Playlist';
import { SpotifyApiService } from './../spotify-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remove-duplicate-page',
  templateUrl: './remove-duplicate-page.component.html',
  styleUrls: ['./remove-duplicate-page.component.scss']
})

export class RemoveDuplicatePageComponent implements OnInit
{
  playlists: Array<Playlist>;

  constructor(private spotifyApiService: SpotifyApiService)
  {
    this.playlists = new Array<Playlist>();
  }

  ngOnInit()
  {
    console.log('[RemoveDuplicatePage | ngOnInit] IN');

    this.spotifyApiService
      .getUserPlaylists()
      .then((playlists) =>
      {
        this.playlists = playlists;
      });

    console.log('[RemoveDuplicatePage | ngOnInit] OUT');
  }

}
