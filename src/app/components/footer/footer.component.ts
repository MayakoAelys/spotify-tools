import { IconTypes } from './../../../constants/IconTypes';
import { Component, OnInit } from '@angular/core';

@Component(
{
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit
{
  iconURL: string;

  constructor() { this.iconURL = IconTypes.Smile; }

  ngOnInit() { }
}
