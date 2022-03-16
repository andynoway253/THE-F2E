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

  aSubscription: any;

  ngOnInit(): void {
    forkJoin([
      this.dataService.getScenicSpotAll(),
      this.dataService.getRestaurantAll(),
      this.dataService.getHotelAll(),
      this.dataService.getActivityAll(),
    ]).subscribe({
      next: ([scenicSpot, restaurant, hotel, activity]) => {
        this.scenicSpot = scenicSpot;
        this.restaurant = restaurant;
        this.hotel = hotel;
        this.activity = activity;
      },
    });
  }
}
