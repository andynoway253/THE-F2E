import { Component, OnInit } from '@angular/core';
import {
  ACTIVITYLIST,
  RESTAURANTSLIST,
  SCENICSPOT,
} from 'src/app/shared/model/data.model';
import { PageEvent } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-themeList',
  templateUrl: './themeList.component.html',
  styleUrls: ['./themeList.component.scss'],
})
export class ThemeListComponent implements OnInit {
  constructor(
    private router: Router,

    private dataService: DataService
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
      observable = this.dataService.getActivity({ theme });
    }

    if (this.currentPage === 'Restaurant') {
      observable = this.dataService.getRestaurant({ theme });
    }

    if (this.currentPage === 'ScenicSpot') {
      observable = this.dataService.getScenicSpot({ theme: theme + '類' });
    }

    observable.subscribe({
      next: (res: any) => {
        console.log(res);
        this.showThemeList = true;

        this.data = res
          .map((item: any, idx: number) => {
            return {
              id: idx,
              name:
                this.currentPage === 'Activity'
                  ? item.ActivityName
                  : this.currentPage === 'Restaurant'
                  ? item.RestaurantName
                  : item.ScenicSpotName,
              class: item.Class ? item.Class : item.Class1,
              ...item,
            };
          })
          .slice(0, 10);
        this.tempData = res.map((item: any, idx: number) => {
          return {
            id: idx,
            name:
              this.currentPage === 'Activity'
                ? item.ActivityName
                : this.currentPage === 'Restaurant'
                ? item.RestaurantName
                : item.ScenicSpotName,
            class: item.Class ? item.Class : item.Class1,
            ...item,
          };
        });      },
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
