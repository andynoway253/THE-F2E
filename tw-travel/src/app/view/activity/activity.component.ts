import { Component, OnInit } from '@angular/core';
import {
  ACTIVITYLIST,
  CITYLIST,
} from 'src/app/shared/model/data.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  constructor() {}

  defaultSelectItem = '';

  cityList = CITYLIST;

  themeList = ACTIVITYLIST;

  ngOnInit(): void {}
}
