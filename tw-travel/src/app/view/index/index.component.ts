import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SearchBarService } from 'src/app/shared/component/search-bar/search-bar.service';
import { DataService } from '../../shared/service/data.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(
    private dataService: DataService,

    private searchBarService: SearchBarService
  ) {}

  @ViewChild('newSwiper') newSwiper: any;

  scenicSpot: any = [];

  restaurant: any = [];

  hotel: any = [];

  activity: any = [];

  ngOnInit(): void {
    forkJoin(
      ['ScenicSpot', 'Restaurant', 'Activity'].map((category) =>
        this.dataService.getDataAll({ category })
      )
    ).subscribe({
      next: ([scenicSpot, restaurant, activity]) => {
        this.scenicSpot = scenicSpot;
        this.restaurant = restaurant;
        this.activity = activity;
      },
    });
  }

  search(params: {
    selectCategory: string;
    selectCity?: string;
    selectTheme?: string;
  }) {
    this.searchBarService.search(params);
  }
}
