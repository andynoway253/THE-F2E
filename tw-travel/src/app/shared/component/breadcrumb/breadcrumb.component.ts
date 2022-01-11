import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  public breadcrumbs: Array<any> = [];

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
    console.log(this.breadcrumbs);
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
}
