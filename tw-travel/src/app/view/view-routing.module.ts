import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ActivityDetailComponent } from './activity/activity-detail/activity-detail.component';
import { ActivityComponent } from './activity/activity.component';
import { IndexComponent } from './index/index.component';

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
        children: [
          {
            path: 'Detail',
            component: ActivityDetailComponent,
            data: { breadcrumb: 'Detail' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRouterModule {}
