import { Component } from '@angular/core';
import { CITYLIST } from '../../model/data.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor() {}

  cityList = CITYLIST;

  defaultSelectItem = '';

  ngOnInit() {}
}
