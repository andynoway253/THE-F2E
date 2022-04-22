import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  @Output() showThemeList = new EventEmitter<any>();

  breadcrumbs: Array<any> = [];

  aaaSubscription: any;

  ngOnInit(): void {
    this.aaaSubscription = this.breadcrumbService.routeEvent.subscribe({
      next: (root: ActivatedRoute) => {
        this.breadcrumbs = this.createBreadcrumbs(root);
      },
    });

    this.breadcrumbs = this.createBreadcrumbs(
      this.breadcrumbService.getActivatedRouteRoot()
    );
  }

  ngOnDestroy(): void {
    this.aaaSubscription.unsubscribe();
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

    if (label.indexOf('/') !== '-1') {
      let breadcrumb: Array<any> = [];

      breadcrumb = label
        .split('/')
        .filter((item: string) => item)
        .map((item: string, idx: number) => {
          const routeURL: Array<string> = children.snapshot.url.map(
            (segment) => segment.path
          );

          if (routeURL[idx]) {
            url += `/${routeURL[idx]}`;
          }
          return {
            label: item,
            params: children.snapshot.params,
            url: url,
          };
        });
      return this.createBreadcrumbs(children, url, [
        ...breadcrumbs,
        ...breadcrumb,
      ]);
    }

    const routeURL: string = children.snapshot.url
      .map((segment) => segment.path)
      .join('/');
    if (routeURL !== '') {
      url += `/${routeURL}`;
    }

    const breadcrumb = {
      label: label,
      params: children.snapshot.params,
      url: url,
    };

    return this.createBreadcrumbs(children, url, [...breadcrumbs, breadcrumb]);
  }

  breadClick() {
    this.showThemeList.emit();
  }
}
