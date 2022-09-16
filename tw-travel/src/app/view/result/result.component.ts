import { BehaviorSubject, EMPTY, of, Subject, switchMap } from 'rxjs';
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
        switchMap((params) => {
          if (
            this.currentTheme !== params['theme'] ||
            this.currentCity !== params['city']
          ) {
            return of({ ...params, reloadData: true }); //  當「城市」或是「主題」變動需要重新撈取資料
          } else if (this.currentPage !== params['page']) {
            return of({ ...params, reloadData: false }); //  當頁數變動不需要重新撈取資料
          }
          return EMPTY;
        }),
        switchMap((params: any) => {
          this.currentCategory = params['category'];
          this.currentTheme = params['theme'];
          this.currentCity = params['city'];
          this.currentPage = params['page'] || 0;

          this.dataReadySubject$.next(null);

          if (params['reloadData']) {
            const obj = {
              category: this.currentCategory,
              theme:
                this.currentCategory === 'ScenicSpot' && this.currentTheme
                  ? this.currentTheme + '類'
                  : this.currentTheme || '',
            };

            const dataByCity = {
              ...obj,
              city: this.currentCity,
            };
            const data = obj;

            let observable: any;

            return (observable = this.currentCity
              ? this.dataService.getDataByCity(dataByCity)
              : this.dataService.getData(data));
          }

          return of(params['reloadData']);
        })
      )
      .subscribe({
        next: (res: Array<[] | boolean>) => {
          if (typeof res === 'object') {
            this.tempData = res;
            //  回傳陣列 判斷有無資料
            if (res.length) {
              this.data = this.tempData.slice(
                0 + this.currentPage * 10,
                10 + this.currentPage * 10
              );
            } else {
              this.data = [];
            }
          } else {
            //  回傳boolean 僅是頁面的切換
            this.data = this.tempData.slice(
              0 + this.currentPage * 10,
              10 + this.currentPage * 10
            );
          }

          this.dataReadySubject$.next(this.data);
        },
      });
  }

  themeList: Array<{ label: string; value: string | null; src: string }> = []; // 分類列表

  currentCategory = '';

  currentTheme = '';

  currentCity = '';

  currentPage = 0;

  reloadData = true;

  data: any = [];

  tempData: any = [];

  dataReadySubject$ = new BehaviorSubject(null); //  取得資料前先顯示轉圈葉面

  aaa = new Subject<boolean>();

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
