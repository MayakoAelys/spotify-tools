import { Component, OnInit, Input, KeyValueDiffers } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-st-select',
  templateUrl: './st-select.component.html',
  styleUrls: ['./st-select.component.scss']
})
export class StSelectComponent implements OnInit {
  @Input() options: Array<KeyValue<string, string>> = new Array();

  constructor()
  {
    this.options.forEach(element => {
      this.options.push({ key: element.key, value: element.value });
    });
  }

  ngOnInit() {
  }

}
