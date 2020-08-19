import { DomSanitizer } from '@angular/platform-browser';
import { TrackToRemove } from './../../../models/TrackToRemove';
import { Playlist } from './../../../models/spotify/Playlist';
import { SpotifyApiService } from './../../spotify-api.service';
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

  deleteInProgress: boolean = false;
  deleteDone: boolean       = false;
  tracksCount: number       = 0;

  constructor(
  private spotifyApiService: SpotifyApiService,
  private sanitizer: DomSanitizer) { }

  // ref.: https://stackoverflow.com/a/37432961/2455658
  public sanitize(url: string)
  {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

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

  async selectedPlaylistChange(event: any)
  {
    console.log('selectedPlaylistChange event:', event);

    this.selectedPlaylist = event ? JSON.parse(event) : undefined;
    this.deleteDone = false;
    this.deleteInProgress = false;

    if (!this.selectedPlaylist)
      return;

    // Get songs to detect duplicates
    const tracks = await this.spotifyApiService.getPlaylistTracks(this.selectedPlaylist.ID);
    const uniqueTracks: Track[] = [];
    const dupeTracks:   Track[] = [];

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

  async removeDuplicates(event: any)
  {
    console.log('removeDuplicates event:', event);

    const playlistTracks = await this.spotifyApiService.getPlaylistTracks(this.selectedPlaylist.ID);
    let uniqueTracks: Track[] = [];
    let tracksToRemove: TrackToRemove[] = [];

    for (let i = 0; i < playlistTracks.length; i++)
    {
      const track = playlistTracks[i];
      const alreadyExists = uniqueTracks.filter(t => t.ID === track.ID).length !== 0;

      console.log('Track ID:', track.ID);
      console.log('    - alreadyExists:', alreadyExists);

      if (!alreadyExists)
      {
        uniqueTracks.push(track);
        continue;
      }

      // Already exist, need to remove it
      const trackToRemove = tracksToRemove.filter(t => t.ID === track.ID);
      console.log('    - trackToRemove:', trackToRemove);
      console.log('    - tracksToRemove before update:', tracksToRemove);

      if (trackToRemove.length === 0)
      {
        const newTrackToRemove = new TrackToRemove(track.ID, track.URI, [i]);
        console.log('    - newTrackToRemove:', newTrackToRemove);

        tracksToRemove.push(newTrackToRemove);
      }
      else
      {
        const removeIndex = tracksToRemove.findIndex(t => t.ID === track.ID);
        console.log('    - removeIndex:', removeIndex, '| trackToRemove:', tracksToRemove[removeIndex]);

        tracksToRemove[removeIndex].Positions.push(i);
        console.log('    - trackTeRemove updated:', tracksToRemove[removeIndex]);
      }

      console.log('    - tracksToRemove after update:', tracksToRemove);
    }

    // Request to delete selected tracks
    this.deleteInProgress = true;
    this.tracksCount = tracksToRemove.length;
    await this.spotifyApiService.removeTracksFromPlaylist(this.selectedPlaylist, tracksToRemove);

    this.deleteDone = true;
    this.refreshSelectPlaylists();
    console.log('Tracks removed.');
  }

  //#endregion
}
