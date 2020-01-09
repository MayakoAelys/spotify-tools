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
    this.options.push({ key: 'Example value with many characters to show. The quick lazy brown wfox blablablabla', value: 'def' });
    this.options.push({ key: 'abc', value: 'def' });
    this.options.push({ key: 'abc', value: 'def' });
  }

  ngOnInit() {
  }

}
