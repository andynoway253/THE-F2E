import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './view/detail/detail.component';
import { IndexComponent } from './view/index/index.component';
import { ResultComponent } from './view/result/result.component';
import { ThemeComponent } from './view/theme/theme.component';

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
        component: ThemeComponent,
        data: { breadcrumb: '節慶活動' },
      },

      {
        path: 'Activity/Result',
        component: ResultComponent,
        data: { breadcrumb: '/節慶活動/搜尋結果' },
      },

      {
        path: 'Activity/Result/Detail',
        component: DetailComponent,
        data: { breadcrumb: '/節慶活動/搜尋結果/詳細' },
      },

      {
        path: 'Restaurant',
        component: ThemeComponent,
        data: { breadcrumb: '品嘗美食' },
      },

      {
        path: 'Restaurant/Result',
        component: ResultComponent,
        data: { breadcrumb: '品嘗美食/搜尋結果' },
      },

      {
        path: 'Restaurant/Result/Detail',
        component: DetailComponent,
        data: { breadcrumb: '/品嘗美食/搜尋結果/詳細' },
      },

      {
        path: 'ScenicSpot',
        component: ThemeComponent,
        data: { breadcrumb: '探索景點' },
      },

      {
        path: 'ScenicSpot/Result',
        component: ResultComponent,
        data: { breadcrumb: '探索景點/搜尋結果' },
      },

      {
        path: 'ScenicSpot/Result/Detail',
        component: DetailComponent,
        data: { breadcrumb: '/探索景點/搜尋結果/詳細' },
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
