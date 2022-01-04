import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/module/material.module';
import { ActivityComponent } from './activity/activity.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarouselModule } from './shared/carousel/carousel.module';

const COMPONENT = [
  IndexComponent,
  ActivityComponent,
  AttractionsComponent,
  RestaurantComponent,
];

@NgModule({
  declarations: [COMPONENT],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    CarouselModule,
  ],
})
export class ViewModule {}
