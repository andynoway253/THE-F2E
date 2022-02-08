import { Restaurants } from './../../shared/model/api.model';
import { Component, OnInit } from '@angular/core';
import { RESTAURANTSLIST } from 'src/app/shared/model/data.model';
import { RestaurantService } from './restaurant.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
  providers: [RestaurantService],
})
export class RestaurantComponent implements OnInit {
  constructor(private restaurantService: RestaurantService) {}

  themeList = RESTAURANTSLIST;

  title = '';

  pageSize = 10;

  restaurantData: Array<Restaurants> = [];

  tempRestaurantData: Array<Restaurants> = [];

  showRestaurant = false;

  ngOnInit(): void {}

  theme(theme: string) {
    this.title = theme;

    this.restaurantService.getRestaurant({ theme }).subscribe({
      next: (res) => {
        this.showRestaurant = true;

        this.restaurantData = res.slice(0, 10);
        this.tempRestaurantData = res;
      },
    });
  }

  pageChange(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.restaurantData = this.tempRestaurantData.slice(
      0 + e.pageIndex * e.pageSize,
      e.pageSize + e.pageIndex * e.pageSize
    );
  }

  backTheme() {
    this.showRestaurant = false;
  }
}
