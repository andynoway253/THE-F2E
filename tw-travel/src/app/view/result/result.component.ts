import { BehaviorSubject, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ACTIVITYLIST,
  RESTAURANTSLIST,
  SCENICSPOTLIST,
} from 'src/app/shared/model/data.model';
import { DataService } from 'src/app/shared/service/data.service';
import { SearchBarService } from 'src/app/shared/component/search-bar/search-bar.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,

    private router: Router,

    private dataService: DataService,

    private searchBarService: SearchBarService
  ) {
    this.route.queryParams
      .pipe(
        switchMap((params: any) => {
          this.currentCategory = params['category'];
          this.currentTheme = params['theme'];
          this.currentCity = params['city'];
          this.currentPage = params['page'] || 0;

          let observable: any;
          const dataByCity = {
            category: this.currentCategory,
            city: this.currentCity || '',
            theme:
              this.currentCategory === 'ScenicSpot' && this.currentTheme
                ? this.currentTheme + '類'
                : this.currentTheme,
          };
          const data = {
            category: this.currentCategory,
            theme:
              this.currentCategory === 'ScenicSpot'
                ? this.currentTheme + '類'
                : this.currentTheme || '',
          };
          observable = this.currentCity
            ? this.dataService.getDataByCity(dataByCity)
            : this.dataService.getData(data);

          return observable;
        })
      )
      .subscribe({
        next: (res: any) => {
          const data = res.map((item: any, idx: number) => {
            return {
              id: idx,
              name: item[`${this.currentCategory}Name`],
              class: item.Class
                ? item.Class
                : item.Class1
                ? item.Class1
                : item.Class2
                ? item.Class2
                : '其他類',
              ...item,
            };
          });
          this.data = data.slice(
            0 + this.currentPage * 10,
            10 + this.currentPage * 10
          );
          this.tempData = data;
          this.dataSubject$.next(this.data);
        },
      });
  }

  themeList: Array<{ label: string; value: string | null; src: string }> = []; // 分類列表

  currentCategory = '';

  currentTheme = '';

  currentCity = '';

  currentPage = 0;

  data: any = [];

  tempData: any = [];

  dataSubject$ = new BehaviorSubject(null);

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

  pageChange(e: PageEvent) {
    this.currentPage = e.pageIndex;

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {
        category: this.currentCategory,
        city: this.currentCity,
        theme: this.currentTheme,
        page: this.currentPage,
      },
    });
  }

  backTheme() {
    this.router.navigate([`${this.currentCategory}`]);
  }
}
