import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './view/detail/detail.component';
import { IndexComponent } from './view/index/index.component';
import { ThemeListComponent } from './view/themeList/themeList.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: '首頁' },
    children: [
      {
        path: '',
        component: IndexComponent,
      },

      {
        path: 'Activity',
        component: ThemeListComponent,
        data: { breadcrumb: '節慶活動' },
      },

      {
        path: 'Activity/:id',
        component: DetailComponent,
        data: { breadcrumb: '/節慶活動/詳細' },
      },

      {
        path: 'Restaurant',
        component: ThemeListComponent,
        data: { breadcrumb: '品嘗美食' },
      },

      {
        path: 'Restaurant/:id',
        component: DetailComponent,
        data: { breadcrumb: '/品嘗美食/詳細' },
      },

      {
        path: 'ScenicSpot',
        component: ThemeListComponent,
        data: { breadcrumb: '探索景點' },
      },

      {
        path: 'ScenicSpot/:id',
        component: DetailComponent,
        data: { breadcrumb: '/探索景點/詳細' },
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
