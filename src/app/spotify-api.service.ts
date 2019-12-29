import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import localforage from 'localforage';
import { StorageKeys } from "../constants/StorageKeys";

@Injectable({
  providedIn: 'root'
})

export class SpotifyApiService {
  constructor(private httpClient: HttpClient) { }

  async getUserProfile(): Promise<any> {
    console.log('SpotifyApiService - GetUserProfile IN');

    let result;
    let httpOptions = await this.getHttpOptions();

    result = await this.httpClient
      .get('https://api.spotify.com/v1/me', httpOptions)
      // .subscribe((apiResult) => {
      //   console.log('apiResult: ', apiResult);
      // })
      .toPromise();

    console.log('result value:', result);
    console.log('SpotifyApiService - GetUserProfile OUT');

    return Promise.resolve(result);
  }

  private async getHttpOptions(): Promise<any> {
    var token = await this.getToken();

    console.log('token:', token);

    return Promise.resolve({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }

  private async getToken(): Promise<string> {
    let result = '';

    console.log('getToken IN');

    await localforage.getItem(StorageKeys.SpotifyToken).then((tokenValue) => {
      result = tokenValue;
    });

    console.log('getToken OUT value=', result);

    return result;
  }
}

