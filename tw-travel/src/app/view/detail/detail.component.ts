import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { map, Observable, switchMap } from 'rxjs';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,

    private dataService: DataService
  ) {}

  name: string;

  page: string;

  detailData: any;

  ngOnInit(): void {
    let observable: Observable<Array<any>>;
    this.route.queryParamMap
      .pipe(
        switchMap((queryParams: any) => {
          const { page, name, theme } = queryParams.params;
          this.page = page;
          this.name = name;

          if (page === 'Activity') {
            observable = this.dataService.getActivity({ theme });
          }

          if (page === 'Restaurant') {
            observable = this.dataService.getRestaurant({ theme });
          }

          if (page === 'ScenicSpot') {
            observable = this.dataService.getScenicSpot({ theme });
          }
          return observable;
        }),
        switchMap((res) => {
          this.detailData = res
            .filter((item) => item[`${this.page}Name`] === this.name)
            .map((item) => ({
              ...item,
              Name: item[`${this.page}Name`],
            }))[0];

          const { City } = this.detailData;

          if (this.page === 'Activity') {
            observable = this.dataService.getActivityCity({ City });
          }

          if (this.page === 'Restaurant') {
            observable = this.dataService.getRestaurantCity({ City });
          }

          if (this.page === 'ScenicSpot') {
            observable = this.dataService.getScenicSpotCity({ City });
          }
          return observable;
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
