import {
  ACTIVITYLIST,
  RESTAURANTSLIST,
  SCENICSPOTLIST,
  CITYLIST,
} from './../../model/data.model';
import { AlertMessageService } from './../alert-message/alert-message.service';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TaiwanMapService } from '../taiwan-map/taiwan-map.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor(
    private alertMessageService: AlertMessageService,

    private taiwanMapService: TaiwanMapService
  ) {}

  @Input() layout = 'row';

  @Input() hiddenCategory = false;

  @Input() hiddenCity = false;

  @Input() hiddenTheme = false;

  @Input() hiddenKeyWord = false;

  @Input() set category(value: any) {
    this.selectCategory = value;
  }

  @Input() set city(value: any) {
    this.selectCity = value;
  }

  @Input() set theme(value: any) {
    this.selectTheme = value;
  }

  @Output() executeSearch = new EventEmitter<{
    selectCategory: string;
    selectCity: string;
    selectTheme: string;
  }>();

  cityList = CITYLIST;

  themeList: Array<{ label: string; value: string | null; src: string }>;

  categoryList = [
    { label: '探索景點', value: 'ScenicSpot' },
    { label: '節慶活動', value: 'Activity' },
    { label: '品嚐美食', value: 'Restaurant' },
  ];

  selectCategory = '';

  selectCity = '';

  selectTheme = '';

  ngOnInit() {
    this.selectCategory === 'Activity'
      ? (this.themeList = ACTIVITYLIST)
      : this.selectCategory === 'ScenicSpot'
      ? (this.themeList = SCENICSPOTLIST)
      : (this.themeList = RESTAURANTSLIST);
  }

  search(params: {
    selectCategory: string;
    selectCity: string;
    selectTheme: string;
  }) {
    const { selectCategory, selectCity, selectTheme } = params;

    if (!selectCategory) {
      this.alertMessageService.showInfo('請先選擇類別！');
      return;
    }

    if (!selectCity && !selectTheme) {
      this.alertMessageService.showInfo('請先選擇城市或主題！');
      return;
    }

    this.executeSearch.emit(params);
  }

  openTWMap() {
    this.taiwanMapService.open();
  }
}
