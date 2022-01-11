import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from './shared/component/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,

    private breadcrumbService: BreadcrumbService
  ) {}

  private _routerSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this._routerSubscription = this.router.events.subscribe({
      next: (res) => {
        if (res instanceof NavigationEnd) {
          const root: ActivatedRoute = this.activatedRoute.root;
          this.breadcrumbService.setActivatedRouteRoot(root);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }
}
