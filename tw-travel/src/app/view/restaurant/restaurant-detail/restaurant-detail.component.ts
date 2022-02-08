import { Component, OnInit } from '@angular/core';
import { ACTIVITYLIST, CITYLIST } from 'src/app/shared/model/data.model';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss'],
})
export class RestaurantDetailComponent implements OnInit {
  constructor() {}

  defaultSelectItem = '';

  cityList = CITYLIST;

  themeList = ACTIVITYLIST;

  ngOnInit(): void {}
}
