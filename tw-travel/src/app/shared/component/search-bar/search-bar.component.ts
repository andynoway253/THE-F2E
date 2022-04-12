import { AlertMessageService } from './../alert-message/alert-message.service';
import { Component, Input, Output } from '@angular/core';
import { CITYLIST } from '../../model/data.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor(private alertMessageService: AlertMessageService) {}

  @Input() index = '';

  @Output() executeSearch = new EventEmitter<string>();

  cityList = CITYLIST;

  defaultSelectItem = '';

  ngOnInit() {}

  search(event: string) {
    if (!event) {
      this.alertMessageService.showInfo('請先選擇城市！');
      return;
    }

    this.executeSearch.emit(event);
  }
}
