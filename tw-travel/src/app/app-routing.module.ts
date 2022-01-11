import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './view/activity/activity.component';
import { AttractionsComponent } from './view/attractions/attractions.component';
import { IndexComponent } from './view/index/index.component';
import { RestaurantComponent } from './view/restaurant/restaurant.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Index' },
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: 'Activity',
        component: ActivityComponent,
        data: { breadcrumb: 'Activity' },
      },
      {
        path: 'Attractions',
        component: AttractionsComponent,
        data: { breadcrumb: 'Attractions' },
      },
      {
        path: 'Restaurant',
        component: RestaurantComponent,
        data: { breadcrumb: 'Restaurant' },
      },
    ],
  },
  {
    path: '**',
    component: IndexComponent, // 萬用路徑，路由沒有比對到，永遠會執行
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
