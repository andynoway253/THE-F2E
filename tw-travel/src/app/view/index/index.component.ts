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

  itemList = [
    { value: '探索景點', viewValue: '探索景點' },
    { value: '節慶活動', viewValue: '節慶活動' },
    { value: '品嚐美食', viewValue: '品嚐美食' },
  ];

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

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

    // this.indexService.getScenicSpotCity().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    // });
  }
}
