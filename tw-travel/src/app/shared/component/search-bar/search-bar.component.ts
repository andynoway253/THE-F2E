import {
  ACTIVITYLIST,
  RESTAURANTSLIST,
  SCENICSPOTLIST,
  CITYLIST,
} from './../../model/data.model';
import { AlertMessageService } from './../alert-message/alert-message.service';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TaiwanMapService } from '../taiwan-map/taiwan-map.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @Input() category = '';

  @Input() city = '';

  @Input() theme = '';

  @Output() executeSearch = new EventEmitter<{
    selectCategory: string;
    selectCity: string;
    selectTheme: string;
  }>();

  cityList = CITYLIST;

  themeList: Array<{ label: string; value: string | null; src: string }> =
    SCENICSPOTLIST;

  categoryList = [
    { label: '探索景點', value: 'ScenicSpot' },
    { label: '節慶活動', value: 'Activity' },
    { label: '品嚐美食', value: 'Restaurant' },
  ];

  selectCategory = 'ScenicSpot';

  selectCity = '';

  selectTheme = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      changes['category'].currentValue === 'Activity'
        ? (this.themeList = ACTIVITYLIST)
        : changes['category'].currentValue === 'ScenicSpot'
        ? (this.themeList = SCENICSPOTLIST)
        : (this.themeList = RESTAURANTSLIST);

      this.selectCategory = changes['category']?.currentValue;
      this.selectCity = changes['city']?.currentValue;
      this.selectTheme = changes['theme']?.currentValue;
    }
  }

  ngOnInit() {}

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
