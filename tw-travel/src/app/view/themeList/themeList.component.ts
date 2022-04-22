import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  ACTIVITYLIST,
  CITYLIST,
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

  themeList: Array<{ label: string; value: any; src: string }> = []; // 分類列表

  currentPage: string | undefined = '';

  currentTheme: string | undefined = '';

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

  search(params: { selectCity?: string; selectTheme?: string }) {
    let observable: any;

    const { selectCity, selectTheme } = params;

    this.currentTheme = selectTheme;
    switch (this.currentPage) {
      case 'Activity':
        observable = selectCity
          ? this.dataService.getActivityByCity({
              city: selectCity,
              theme: selectTheme,
            })
          : this.dataService.getActivity({ theme: selectTheme });
        break;

      case 'ScenicSpot':
        observable = selectCity
          ? this.dataService.getScenicSpotByCity({ city: selectCity })
          : this.dataService.getScenicSpot({ theme: selectTheme });
        break;

      case 'Restaurant':
        observable = selectCity
          ? this.dataService.getRestaurantByCity({ city: selectCity })
          : this.dataService.getRestaurant({ theme: selectTheme });
        break;

      default:
        break;
    }

    observable.subscribe({
      next: (res: any) => {
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
        });
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
