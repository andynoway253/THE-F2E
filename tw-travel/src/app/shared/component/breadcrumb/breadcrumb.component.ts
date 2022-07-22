import { Subscription, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  breadcrumbs: Array<any> = [];

  breadSubscription: Subscription;

  resultParams: any;

  ngOnInit(): void {
    this.breadSubscription = this.breadcrumbService.setQueryParams
      .pipe(
        switchMap((res) => {
          this.resultParams = res;

          return this.breadcrumbService.routeEvent;
        })
      )
      .subscribe({
        next: (root: ActivatedRoute) => {
          this.breadcrumbs = this.createBreadcrumbs(root);
        },
      });
  }

  ngOnDestroy(): void {
    this.breadSubscription.unsubscribe();
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<any> = []
  ): Array<any> {
    const children = route.firstChild;

    if (!children) {
      return [...breadcrumbs];
    }

    const label = children.snapshot.data['breadcrumb'];

    let breadcrumb: Array<any> = [];
    breadcrumb = label
      .split('/')
      .filter((item: string) => item)
      .map((label: string, idx: number) => {
        const routeURL: Array<string> = children.snapshot.url.map(
          (segment) => segment.path
        );

        if (routeURL[idx]) {
          url += `/${routeURL[idx]}`;
        }

        if (label === '搜尋結果') {
          return {
            label,
            params: this.resultParams?.queryParams,
            url,
          };
        }

        return {
          label,
          url,
        };
      });

    return this.createBreadcrumbs(children, url, [
      ...breadcrumbs,
      ...breadcrumb,
    ]);
  }
}
