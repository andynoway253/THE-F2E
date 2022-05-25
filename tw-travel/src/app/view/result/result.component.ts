import { Component, OnInit } from '@angular/core';
import {
  ACTIVITYLIST,
  RESTAURANTSLIST,
  SCENICSPOT,
} from 'src/app/shared/model/data.model';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,

    private dataService: DataService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.currentCategory = params['category'];
      this.currentTheme = params['theme'];
      this.currentCity = params['city'];
    });
  }

  themeList: Array<{ label: string; value: any; src: string }> = []; // 分類列表

  currentCategory: string | undefined = '';

  currentTheme: string | undefined = '';

  currentCity: string | undefined = '';

  pageSize = 10;

  data: any = [];

  tempData: any = [];

  ngOnInit(): void {
    switch (this.currentCategory) {
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

    this.search({
      selectCity: this.currentCity,
      selectTheme: this.currentTheme,
    });
  }

  search(params: { selectCity?: string; selectTheme?: string }) {
    const { selectCity, selectTheme } = params;

    let observable: any;

    switch (this.currentCategory) {
      case 'Activity':
        observable = selectCity
          ? this.dataService.getDataByCity({
              category: 'Activity',
              city: selectCity,
              theme: selectTheme,
            })
          : this.dataService.getActivity({ theme: selectTheme });
        break;

      case 'ScenicSpot':
        observable = selectCity
          ? this.dataService.getDataByCity({
              category: 'ScenicSpot',
              city: selectCity,
              theme: selectTheme + '類',
            })
          : this.dataService.getScenicSpot({ theme: selectTheme + '類' });
        break;

      case 'Restaurant':
        observable = selectCity
          ? this.dataService.getDataByCity({
              category: 'Restaurant',
              city: selectCity,
              theme: selectTheme,
            })
          : this.dataService.getRestaurant({ theme: selectTheme });
        break;

      default:
        break;
    }

    observable.subscribe({
      next: (res: any) => {
        this.data = res
          .map((item: any, idx: number) => {
            return {
              id: idx,
              name:
                this.currentCategory === 'Activity'
                  ? item.ActivityName
                  : this.currentCategory === 'Restaurant'
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
              this.currentCategory === 'Activity'
                ? item.ActivityName
                : this.currentCategory === 'Restaurant'
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

  backTheme() {}
}
