import {
  ACTIVITYLIST,
  RESTAURANTSLIST,
  SCENICSPOTLIST,
} from './../../model/data.model';
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

  @Input() page: string | undefined = '';

  @Input() set theme(value: any) {
    this.selectTheme = value;
  }

  @Output() executeSearch = new EventEmitter<{
    selectCity: string;
    selectTheme: string;
  }>();

  cityList = CITYLIST;

  themeList: any;

  selectCity = '';

  selectTheme = '';

  ngOnInit() {
    this.page === 'Activity'
      ? (this.themeList = ACTIVITYLIST)
      : this.page === 'ScenicSpot'
      ? (this.themeList = SCENICSPOTLIST)
      : (this.themeList = RESTAURANTSLIST);
  }

  search(params: { selectCity: string; selectTheme: string }) {
    if (!params.selectCity && !params.selectTheme) {
      this.alertMessageService.showInfo('請先選擇城市或主題！');
      return;
    }

    this.executeSearch.emit(params);
  }
}
