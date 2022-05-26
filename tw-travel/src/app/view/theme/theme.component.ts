import { SearchBarService } from './../../shared/component/search-bar/search-bar.service';
import { BreadcrumbService } from './../../shared/component/breadcrumb/breadcrumb.service';
import { Component, OnInit } from '@angular/core';
import {
  ACTIVITYLIST,
  RESTAURANTSLIST,
  SCENICSPOTLIST,
} from 'src/app/shared/model/data.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit {
  constructor(
    private router: Router,

    private searchBarService: SearchBarService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentCategory = event.url.slice(1);
      }
    });
  }

  themeList: Array<{ label: string; value: string | null; src: string }> = []; // 分類列表

  currentCategory: string = '';

  currentTheme: string = '';

  ngOnInit(): void {
    switch (this.currentCategory) {
      case 'Activity':
        this.themeList = ACTIVITYLIST;
        break;

      case 'ScenicSpot':
        this.themeList = SCENICSPOTLIST;
        break;

      case 'Restaurant':
        this.themeList = RESTAURANTSLIST;
        break;

      default:
        break;
    }
  }

  search(params: { selectCity?: string; selectTheme?: string }) {
    this.searchBarService.search({
      ...params,
      selectCategory: this.currentCategory,
    });
  }
}
