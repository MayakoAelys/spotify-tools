import { Component, OnInit, Input, KeyValueDiffers, Output } from '@angular/core';
import { KeyValue } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-st-select',
  templateUrl: './st-select.component.html',
  styleUrls: ['./st-select.component.scss']
})
export class StSelectComponent implements OnInit {
  @Input() options: Array<KeyValue<string, string>> = new Array();
  @Output() selectedValue: EventEmitter<any> =
    new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  onSelectChange(event: any)
  {
    console.log('st-select | onSelectChange | event.target.value:', event.target.value);
    this.selectedValue.emit(event.target.value);
  }
}
