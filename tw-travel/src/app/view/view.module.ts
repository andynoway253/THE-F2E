import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/module/material.module';
import { ActivityComponent } from './activity/activity.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivityDetailComponent } from './activity/activity-detail/activity-detail.component';
import { ViewRouterModule } from './view-routing.module';
import {
  BreadcrumbModule,
  CarouselModule,
  SearchBarModule,
} from '../shared/component';
import { AttractionsDetailComponent } from './attractions/attractions-detail/attractions-detail.component';
import { RestaurantDetailComponent } from './restaurant/restaurant-detail/restaurant-detail.component';

const COMPONENT = [
  IndexComponent,
  ActivityComponent,
  ActivityDetailComponent,
  AttractionsComponent,
  AttractionsDetailComponent,
  RestaurantComponent,
  RestaurantDetailComponent,
];

@NgModule({
  declarations: [COMPONENT],
  imports: [
    CommonModule,
    FormsModule,

    ViewRouterModule,

    MaterialModule,
    FlexLayoutModule,

    CarouselModule,
    BreadcrumbModule,
    SearchBarModule,
  ],
})
export class ViewModule {}
