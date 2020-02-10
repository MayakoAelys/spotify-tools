import { Component, OnInit, Input } from '@angular/core';
import PlaylistCardValues from 'src/models/PlaylistCardValues';
import { Playlist } from 'src/models/spotify/Playlist';

@Component({
  selector: 'app-st-playlist-card',
  templateUrl: './st-playlist-card.component.html',
  styleUrls: ['./st-playlist-card.component.scss']
})
export class StPlaylistCardComponent implements OnInit {

  @Input() values: Playlist;

  constructor() { }

  ngOnInit() {
  }

}
