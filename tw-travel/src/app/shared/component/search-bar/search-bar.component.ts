import { Component, Input } from '@angular/core';
import { CITYLIST } from '../../model/data.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor() {}

  @Input() index = '';

  cityList = CITYLIST;

  defaultSelectItem = '';

  ngOnInit() {}
}
