import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './view/activity/activity.component';
import { AttractionsComponent } from './view/attractions/attractions.component';
import { IndexComponent } from './view/index/index.component';
import { RestaurantComponent } from './view/restaurant/restaurant.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Index',
    pathMatch: 'full', // 當路徑是空的時候轉址到 Index
  },
  {
    path: 'Index',
    component: IndexComponent,
  },
  {
    path: 'Activity',
    component: ActivityComponent,
  },
  {
    path: 'Attractions',
    component: AttractionsComponent,
  },
  {
    path: 'Restaurant',
    component: RestaurantComponent,
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
