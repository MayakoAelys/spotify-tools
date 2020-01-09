import { Playlist } from './../models/spotify/Playlist';
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

    var profile = new UserProfile(apiResult);
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
    let result = new Array<Playlist>();

    for (let i = 0; i < apiResult.items.length; i++)
    {
      let apiResultItem = apiResult.items[i];

      result.push(new Playlist(apiResultItem));
    }

    console.log('Got', result.length, 'items. Values:', result);
    console.log('[spotify-api.service | getUserPlaylists] OUT');

    return Promise.resolve(result);
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
