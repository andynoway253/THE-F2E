import { Component, OnInit } from '@angular/core';
import {
  ACTIVITYLIST,
  RESTAURANTSLIST,
  SCENICSPOT,
} from 'src/app/shared/model/data.model';
import { ThemeListService } from './themeList.service';
import { PageEvent } from '@angular/material/paginator';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-themeList',
  templateUrl: './themeList.component.html',
  styleUrls: ['./themeList.component.scss'],
  providers: [ThemeListService],
})
export class ThemeListComponent implements OnInit {
  constructor(
    private router: Router,

    private themeListService: ThemeListService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.url.slice(1);
      }
    });
  }

  themeList: Array<{ label: string; src: string }> = [];

  currentPage = '';

  title = '';

  pageSize = 10;

  data: any = [];

  tempData: any = [];

  showThemeList = false;

  ngOnInit(): void {
    switch (this.currentPage) {
      case 'Activity':
        this.themeList = ACTIVITYLIST;
        break;

      case 'ScenicSpot':
        this.themeList = SCENICSPOT;
        break;

      case 'Restaurant':
        this.themeList = RESTAURANTSLIST;
        break;

      default:
        break;
    }
  }

  theme(theme: string) {
    let observable: any;

    this.title = theme;

    if (this.currentPage === 'Activity') {
      observable = this.themeListService.getActivity({ theme });
    }

    if (this.currentPage === 'Restaurant') {
      observable = this.themeListService.getRestaurant({ theme });
    }

    if (this.currentPage === 'ScenicSpot') {
      observable = this.themeListService.getScenicSpot({ theme });
    }

    observable.subscribe({
      next: (res: any) => {
        this.showThemeList = true;

        this.data = res.slice(0, 10);
        this.tempData = res;
      },
    });
  }

  pageChange(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.data = this.tempData.slice(
      0 + e.pageIndex * e.pageSize,
      e.pageSize + e.pageIndex * e.pageSize
    );
  }

  backTheme() {
    this.showThemeList = false;
  }
}
