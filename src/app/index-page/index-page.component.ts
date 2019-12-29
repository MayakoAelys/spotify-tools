import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/constants/StorageKeys';
import localforage from 'localforage';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  username: string = 'username';

  constructor() { }

  ngOnInit() {
  }

  disconnectClick() {
    localforage.removeItem(StorageKeys.SpotifyToken).then(() => {
      document.location.href = '/';
    });
  }

}
