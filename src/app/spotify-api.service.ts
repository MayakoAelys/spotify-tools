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

    const token = await this.getToken();

    if (!token)
    {
      return TokenStatus.EMPTY;
    }

    // Token found, test it
    // Get a new profile object from Spotify
    const httpOptions = await this.getHttpOptions();

    // console.warn('[spotify-api.service | getUserProfile] getting a new user profile from Spotify');

    const result = await this.httpClient
      .get(SpotifyApiEndpoints.CurrentUserProfile, httpOptions)
      .toPromise()
      .then((apiResult) =>
      {
        console.log('then, apiResult:', apiResult);
        return TokenStatus.VALID;
      })
      .catch((apiResult) =>
      {
        console.log('then, apiResult:', apiResult);
        return TokenStatus.EXPIRED;
      });

    // const result = await this.getUserProfile()
    //   .then((userProfile) =>
    //   {
    //     return TokenStatus.VALID;
    //   })
    //   .catch((error) =>
    //   {
    //     return TokenStatus.EXPIRED;
    //   });

    return result;
  }

  async getUserProfile(): Promise<UserProfile>
  {
    let result: UserProfile;

    // Try to get the profile from the storage
    await localforage
      .getItem(StorageKeys.UserProfile)
      .then((value: string) =>
      {
        if (value)
        {
          result = JSON.parse(value);

          // console.warn('[spotify-api.service | getUserProfile] User profile found in storage:', result);

          return;
        }
      });

    if (result) { return Promise.resolve(result); }

    // Get a new profile object from Spotify
    let apiResult;
    const httpOptions = await this.getHttpOptions();

    // console.warn('[spotify-api.service | getUserProfile] getting a new user profile from Spotify');

    apiResult = await this.httpClient
      .get(SpotifyApiEndpoints.CurrentUserProfile, httpOptions)
      .toPromise();


    const profile = new UserProfile(apiResult);

    // Save the new profile
    await localforage
      .setItem(StorageKeys.UserProfile, JSON.stringify(profile));
      // .then(() =>{

      // });

    return Promise.resolve(profile);
  }

  async getUserPlaylists(): Promise<Array<Playlist>>
  {

    let apiResult;
    const httpOptions = await this.getHttpOptions();

    apiResult = await this.httpClient
      .get(SpotifyApiEndpoints.ListOfCurrentUserPlaylists, httpOptions)
      .toPromise();


    // Construct the result array
    const result = new Array<Playlist>();

    for (const apiItem of apiResult.items)
    {
      result.push(new Playlist(apiItem));
    }


    return Promise.resolve(result);
  }

  async createNewPlaylist(
    playlistName: string,
    playlistDescription: string,
    playlistPublic: boolean): Promise<Playlist>
  {

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

    const result = new Playlist(apiResult);

    return Promise.resolve(result);
  }

  async getPlaylistTracks(playlistID: string): Promise<Array<Track>>
  {

    const httpOptions = await this.getHttpOptions();
    const url = SpotifyApiEndpoints.GetPlaylistTracks.replace('{0}', playlistID);

    const apiResult = await this.httpClient
      .get(url, httpOptions)
      .toPromise() as any;

    const result = new Array<Track>();

    if (!apiResult.items)
    {
      return Promise.resolve(result);
    }

    for (const apiItem of apiResult.items)
    {
      result.push(new Track(apiItem.track));
    }


    return Promise.resolve(result);
  }

  async addTracksToPlaylist(
    targetPlaylistID: string,
    sourcePlaylist: Playlist)
  {

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

    // Tell the API to add the tracks to our playlist
    const apiResult = await this.httpClient
      .post(url, data, httpOptions)
      .toPromise();


    return Promise.resolve();
  }

  private async getHttpOptions(): Promise<any>
  {
    const token = await this.getToken();


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
        // console.warn('[spotify-api.service | getToken] LocalForage error:', err);
        // console.warn('    > Returning null');
        result = null;
      });

    return result;
  }
}
