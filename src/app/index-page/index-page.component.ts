import { Component, OnInit, Input } from '@angular/core';
import { StorageKeys } from 'src/constants/StorageKeys';
import localforage from 'localforage';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  username: string = 'username';
  private _userProfile;

  @Input('userProfile')
  set userProfile(userProfile: any) {
    console.warn("userProfile setter, userProfile:", userProfile);
    this._userProfile = userProfile;
    this.updateProfile();
  };

  constructor() { }

  ngOnInit() { this.updateProfile(); }

  updateProfile() {
    console.warn("updateProfile called, userProfile: ", this._userProfile);
    console.warn('this.username: ', this.username);

    if (!this._userProfile) {
      this.username = "Anonymous";
    }
    else {
      this.username = this._userProfile.display_name;
      console.warn('this.username: ', this.username);
    }
  }

  disconnectClick() {
    localforage.removeItem(StorageKeys.SpotifyToken).then(() => {
      document.location.href = '/';
    });
  }

}
