import { Playlist } from './../../models/spotify/Playlist';
import { SpotifyApiService } from './../spotify-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-playlist-page',
  templateUrl: './import-playlist-page.component.html',
  styleUrls: ['./import-playlist-page.component.scss']
})
export class ImportPlaylistPageComponent implements OnInit
{
  playlists: Array<Playlist>;


  constructor(private spotifyApiService: SpotifyApiService) { }

  ngOnInit()
  {
    console.log('ImportPlaylist | ngOnInit] IN');

    this.spotifyApiService
      .getUserPlaylists()
      .then((playlists) =>
      {
        this.playlists = playlists;
      });

    console.log('ImportPlaylist | ngOnInit] OUT');
  }

}
