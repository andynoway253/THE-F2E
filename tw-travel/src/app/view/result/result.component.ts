import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ACTIVITYLIST,
  RESTAURANTSLIST,
  SCENICSPOTLIST,
} from 'src/app/shared/model/data.model';
import { DataService } from 'src/app/shared/service/data.service';
import { BreadcrumbService } from 'src/app/shared/component/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,

    private router: Router,

    private breadcrumbService: BreadcrumbService,

    private dataService: DataService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.currentCategory = params['category'];
      this.currentTheme = params['theme'];
      this.currentCity = params['city'];
    });
  }

  themeList: Array<{ label: string; value: string | null; src: string }> = []; // 分類列表

  currentCategory: string = '';

  currentTheme: string = '';

  currentCity: string = '';

  pageSize = 10;

  data$ = new BehaviorSubject(null);

  data: any = [];

  tempData: any = [];

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

    this.search({
      selectCity: this.currentCity,
      selectTheme: this.currentTheme,
    });
  }

  search(params: { selectCity?: string; selectTheme?: string }) {
    const { selectCity, selectTheme } = params;

    let observable: any;

    const dataByCity = {
      category: this.currentCategory,
      city: selectCity || '',
      theme:
        this.currentCategory === 'ScenicSpot' && selectTheme
          ? selectTheme + '類'
          : selectTheme,
    };

    const data = {
      category: this.currentCategory,
      theme:
        this.currentCategory === 'ScenicSpot'
          ? selectTheme + '類'
          : selectTheme || '',
    };

    observable = selectCity
      ? this.dataService.getDataByCity(dataByCity)
      : this.dataService.getData(data);

    observable.subscribe({
      next: (res: any) => {
        this.data = res
          .map((item: any, idx: number) => {
            return {
              id: idx,
              name: item[`${this.currentCategory}Name`],
              class: item.Class ? item.Class : item.Class1,
              ...item,
            };
          })
          .slice(0, 10);

        this.tempData = res.map((item: any, idx: number) => {
          return {
            id: idx,
            name: item[`${this.currentCategory}Name`],
            class: item.Class ? item.Class : item.Class1,
            ...item,
          };
        });

        this.data$.next(this.data);

        this.router.navigate(['.'], {
          relativeTo: this.route,
          queryParams: {
            category: this.currentCategory,
            city: selectCity,
            theme: selectTheme,
          },
        });

        this.breadcrumbService.setResultParams.next({
          queryParams: {
            category: this.currentCategory,
            city: selectCity,
            theme: selectTheme,
          },
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
    this.router.navigate([`${this.currentCategory}`]);
  }
}
