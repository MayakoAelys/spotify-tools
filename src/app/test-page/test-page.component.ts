import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import PlaylistCardValues from 'src/models/PlaylistCardValues';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  options: Array<KeyValue<string, string>> = new Array();
  playlistCardValues: PlaylistCardValues;

  constructor()
  {
    this.options.push({ key: 'Example value with many characters to show. The quick lazy brown wfox blablablabla', value: 'def' });
    this.options.push({ key: 'abc', value: 'def' });
    this.options.push({ key: 'ghi', value: 'jkl' });

    this.playlistCardValues = new PlaylistCardValues();
    this.playlistCardValues.CoverImageURL = 'https://mosaic.scdn.co/300/02eb31e74f545426947ab82009133378a93a2ed7ab67616d0000b273304ae5169ad8e53e261b93f2ab67616d0000b2736fbf4bb780a9cbc34b3f35daab67616d0000b273d1241debb8543af8322a7d6a';
    this.playlistCardValues.Title = 'Playlist title';
    this.playlistCardValues.SongsCount = 1;
    this.playlistCardValues.Owner = 'Banana42';
  }

  ngOnInit() {
  }

}
