import { Playlist } from './../models/spotify/Playlist';
import { Track } from './../models/spotify/Track';
import { SpotifyApiEndpoints } from './../constants/SpotifyApiEndpoints';
import { StorageKeys } from './../constants/StorageKeys';
import { UserProfile } from './../models/spotify/UserProfile';
import { TokenStatus } from './../constants/TokenStatus';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import localforage from 'localforage';

@Injectable({
  providedIn: 'root'
})

export class SpotifyApiService
{
  constructor(private httpClient: HttpClient) { }

  async getTokenStatus(): Promise<TokenStatus>
  {
    console.log('[spotify-api.service | getTokenStatus] IN');

    const token = await this.getToken();

    if (!token)
    {
      console.log('[spotify-api.service | getTokenStatus] Token not found, returning', TokenStatus.EMPTY);
      return TokenStatus.EMPTY;
    }

    // Token found, test it
    const result = await this.getUserProfile()
      .then((userProfile) =>
      {
        console.log('[spotify-api.service | getTokenStatus] Token found and valid, returning', TokenStatus.VALID);
        return TokenStatus.VALID;
      })
      .catch((error) =>
      {
        console.log('[spotify-api.service | getTokenStatus] Token expired or other error, returning', TokenStatus.EXPIRED);
        return TokenStatus.EXPIRED;
      });

    return result;
  }

  async getUserProfile(): Promise<UserProfile>
  {
    console.log('[spotify-api.service | getUserProfile] IN');
    let result: UserProfile;

    // Try to get the profile from the storage
    await localforage
      .getItem(StorageKeys.UserProfile)
      .then((value: string) =>
      {
        if (value)
        {
          result = JSON.parse(value);

          console.warn('[spotify-api.service | getUserProfile] User profile found in storage:', result);

          return;
        }
      });

    if (result) { return Promise.resolve(result); }

    // Get a new profile object from Spotify
    let apiResult;
    const httpOptions = await this.getHttpOptions();

    console.warn('[spotify-api.service | getUserProfile] getting a new user profile from Spotify');

    apiResult = await this.httpClient
      .get(SpotifyApiEndpoints.CurrentUserProfile, httpOptions)
      .toPromise();

    console.log('[spotify-api.service | getUserProfile] Result value:', apiResult);

    const profile = new UserProfile(apiResult);
    console.log('profile test:', profile);

    // Save the new profile
    await localforage
      .setItem(StorageKeys.UserProfile, JSON.stringify(profile));
      // .then(() =>{

      // });

    console.log('[spotify-api.service | getUserProfile] OUT, value', profile);
    return Promise.resolve(profile);
  }

  async getUserPlaylists(): Promise<Array<Playlist>>
  {
    console.log('[spotify-api.service | getUserPlaylists] IN');

    let apiResult;
    const httpOptions = await this.getHttpOptions();

    apiResult = await this.httpClient
      .get(SpotifyApiEndpoints.ListOfCurrentUserPlaylists, httpOptions)
      .toPromise();

    console.log('[spotify-api.service | getUserPlaylists] apiResult=', apiResult);

    // Construct the result array
    const result = new Array<Playlist>();

    // for (let i = 0; i < apiResult.items.length; i++)
    // {
    //   const apiResultItem = apiResult.items[i];

    //   result.push(new Playlist(apiResultItem));
    // }

    for (const apiItem of apiResult.items)
    {
      result.push(new Playlist(apiItem));
    }

    console.log('Got', result.length, 'items. Values:', result);
    console.log('[spotify-api.service | getUserPlaylists] OUT');

    return Promise.resolve(result);
  }

  async createNewPlaylist(
    playlistName: string,
    playlistDescription: string,
    playlistPublic: boolean): Promise<Playlist>
  {
    console.log('[spotify-api.service | createNewPlaylist] IN');

    const userProfile = await this.getUserProfile();
    const httpOptions = await this.getHttpOptions();
    const url = SpotifyApiEndpoints.CreateNewPlaylist.replace('{0}', userProfile.ID);
    const data =
    {
      name: playlistName,
      description: playlistDescription,
      public: playlistPublic
    };

    const apiResult = await this.httpClient
      .post(url, data, httpOptions)
      .toPromise();

    console.log('[spotify-api.service | createNewPlaylist] apiResult=', apiResult);

    const result = new Playlist(apiResult);

    console.log('[spotify-api.service | createNewPlaylist] returning playlist:', result);
    console.log('[spotify-api.service | createNewPlaylist] OUT');

    return Promise.resolve(result);
  }

  async getPlaylistTracks(playlistID: string): Promise<Array<Track>>
  {
    console.log('[spotify-api.service | getPlaylistTracks] IN');

    const httpOptions = await this.getHttpOptions();
    const url = SpotifyApiEndpoints.GetPlaylistTracks.replace('{0}', playlistID);

    const apiResult = await this.httpClient
      .get(url, httpOptions)
      .toPromise() as any;

    const result = new Array<Track>();

    if (!apiResult.items)
    {
      console.log('[spotify-api.service | getPlaylistTracks] No track retrieved, returning empty array.');
      return Promise.resolve(result);
    }

    for (const apiItem of apiResult.items)
    {
      result.push(new Track(apiItem.track));
    }

    console.log(`[spotify-api.service | getPlaylistTracks] Got ${result.length} track(s):`, result);
    console.log('[spotify-api.service | getPlaylistTracks] OUT');

    return Promise.resolve(result);
  }

  async addTracksToPlaylist(
    targetPlaylistID: string,
    sourcePlaylist: Playlist)
  {
    console.log('[spotify-api.service | addTracksToPlaylist] IN');

    const httpOptions = await this.getHttpOptions();
    const url = SpotifyApiEndpoints.AddTracksToPlaylist.replace('{0}', targetPlaylistID);

    // Get tracks from the source playlist
    // TODO: Increase limit, ATM 100 tracks at most)
    const playListTracks: Array<Track> =
      await this.getPlaylistTracks(sourcePlaylist.ID);

    // Build data wanted by the API
    const tracksUri = [];

    for (const track of playListTracks)
    {
      tracksUri.push(track.URI);
    }

    const data = { uris: tracksUri };
    console.log('[spotify-api.service | addTracksToPlaylist] data:', data);

    // Tell the API to add the tracks to our playlist
    const apiResult = await this.httpClient
      .post(url, data, httpOptions)
      .toPromise();

    console.log('[spotify-api.service | addTracksToPlaylist] apiResult=', apiResult);
    console.log('[spotify-api.service | addTracksToPlaylist] OUT');

    return Promise.resolve();
  }

  private async getHttpOptions(): Promise<any>
  {
    const token = await this.getToken();

    console.log('token:', token);

    return Promise.resolve(
    {
      headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }

  private async getToken(): Promise<string>
  {
    let result;

    await localforage
      .getItem(StorageKeys.SpotifyToken)
      .then((tokenValue) =>
      {
        result = tokenValue;
      })
      .catch((err) =>
      {
        console.warn('[spotify-api.service | getToken] LocalForage error:', err);
        console.warn('    > Returning null');
        result = null;
      });

    return result;
  }
}
