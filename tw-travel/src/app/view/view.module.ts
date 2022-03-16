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
import { ThemeListComponent } from './themeList/themeList.component';
import { ViewRouterModule } from './view-routing.module';
import { DetailComponent } from './detail/detail.component';

const COMPONENT = [IndexComponent, ThemeListComponent, DetailComponent];

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
