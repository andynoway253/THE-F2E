import { AlertMessageModule } from './../shared/component/alert-message/alert-message.module';
import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/module/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbModule,
  CarouselModule,
  SearchBarModule,
} from '../shared/component';
import { ThemeComponent } from './theme/theme.component';
import { ViewRouterModule } from './view-routing.module';
import { DetailComponent } from './detail/detail.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './result/result.component';
import { TaiwanMapModule } from '../shared/component/taiwan-map/taiwan-map.module';

const COMPONENT = [
  IndexComponent,
  ThemeComponent,
  ResultComponent,
  DetailComponent,
];

@NgModule({
  declarations: [COMPONENT],
  imports: [
    CommonModule,
    FormsModule,

    ViewRouterModule,

    MaterialModule,
    FlexLayoutModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,

    AlertMessageModule,
    BreadcrumbModule,
    CarouselModule,
    SearchBarModule,
    TaiwanMapModule,
  ],
})
export class ViewModule {}
