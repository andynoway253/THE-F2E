import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DataService } from '../../shared/service/data.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private dataService: DataService) {}

  @ViewChild('newSwiper') newSwiper: any;

  itemList = ['探索景點', '節慶活動', '品嚐美食'];

  defaultSelectItem = '探索景點';

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
}
