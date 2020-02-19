import { Playlist } from './../../models/spotify/Playlist';
import { SpotifyApiService } from './../spotify-api.service';
import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
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

  playlistURL: string;
  newPlaylist: Playlist;
  importInProgress: boolean = false;
  importDone: boolean = false;

  importErrorMessage: string;
  selectedPlaylist: Playlist = undefined;

  constructor(
    private spotifyApiService: SpotifyApiService,
    private sanitizer: DomSanitizer) { }

  ngOnInit()
  {
    // console.log('ImportPlaylist | ngOnInit] IN');

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

      // console.log('ImportPlaylist | ngOnInit] OUT');
  }

  refreshSelectPlaylists()
  {
    // console.log('ImportPlaylist | refreshSelectPlaylists] IN');

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

    // console.log('ImportPlaylist | refreshSelectPlaylists] OUT');
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

  // ref.: https://stackoverflow.com/a/37432961/2455658
  sanitize(url: string)
  {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  selectedPlaylistChange(event: string)
  {
    // console.log('ImportPlaylist - selectedPlaylistChange:', event);
    this.selectedPlaylist = event ? JSON.parse(event) : undefined;
  }

  async importPlaylist()
  {
    // console.log('importPlaylist - will create this playlist:', this.selectedPlaylist);
    this.importInProgress = true;

    // Create the playlist
    this.newPlaylist =
      await this.spotifyApiService.createNewPlaylist(this.selectedPlaylist.Title, this.selectedPlaylist.Description, false);

    // Add the tracks
    await this.spotifyApiService.addTracksToPlaylist(this.newPlaylist.ID, this.selectedPlaylist);

    // Show success message
    this.importDone = true;
  }

  onURLChange(event: KeyboardEvent)
  {
    if (event.key === 'Enter') { this.getPlaylistByURL(); }
  }

  async getPlaylistByURL()
  {
    // Get the playlist ID from the URL
    // - NOT OK: Show error message
    // - OK: Show the playlist
    console.log('playlist url', this.playlistURL);

    this.selectedPlaylist   = undefined;
    this.importErrorMessage = undefined;

    if (!this.playlistURL)
    {
      this.importErrorMessage = 'No URL was given';
      return;
    }

    const urlSplit = this.playlistURL.split('open.spotify.com/playlist/');
    const playlistID = urlSplit[1];

    console.log('urlSplit:', urlSplit);
    console.log('playlistID:', playlistID);

    if (!playlistID)
    {
      this.importErrorMessage = `Couldn't get the playlist ID from the URL`;
      return;
    }

    console.log('getting playlist...');

    try
    {
      this.selectedPlaylist =
        await this.spotifyApiService.getPlaylistByID(playlistID);
    }
    catch (error)
    {
      console.log('Error while importing the playlist:', error);

      if (error.status === 404)
        this.importErrorMessage = `Playlist not found.`;
      else
        this.importErrorMessage = `The playlist could not be imported.`;
    }
  }
}
