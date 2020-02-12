import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  options: Array<KeyValue<string, string>> = new Array();

  constructor()
  {
    this.options.push({ key: 'Example value with many characters to show. The quick lazy brown wfox blablablabla', value: 'def' });
    this.options.push({ key: 'abc', value: 'def' });
    this.options.push({ key: 'ghi', value: 'jkl' });
  }

  ngOnInit() {
  }

}
