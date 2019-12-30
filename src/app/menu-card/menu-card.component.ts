import { Component, OnInit, Input } from '@angular/core';

@Component(
{
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})

export class MenuCardComponent implements OnInit
{
  @Input() imageSource: string;
  @Input() description: string;

  constructor() { }

  ngOnInit()
  {
    // this.imageSource = '../assets/ic_delete_sweep.svg';
    // this.description = 'This is a menu entry.';
  }
}
