import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Subject, Subscription, takeWhile } from 'rxjs';
import { IndexService } from './index.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [IndexService],
})
export class IndexComponent implements OnInit {
  constructor(private indexService: IndexService) {}

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
      this.indexService.getScenicSpot(),
      this.indexService.getRestaurant(),
      this.indexService.getHotel(),
      this.indexService.getActivity(),
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
