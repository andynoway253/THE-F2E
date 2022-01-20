import { Component, OnInit } from '@angular/core';
import { CITYLIST, THEMELIST } from 'src/app/shared/model/data.model';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss'],
})
export class AttractionsComponent implements OnInit {
  constructor() {}

  defaultSelectItem = '';

  cityList = CITYLIST;

  themeList = THEMELIST;

  ngOnInit(): void {}
}
