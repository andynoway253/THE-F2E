import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BreadcrumbService {
  constructor() {}

  private root: ActivatedRoute = new ActivatedRoute();

  routeEvent = new BehaviorSubject<any>(null);

  setRouterParams = new BehaviorSubject<any>(null); // 記錄搜尋結果的qeuryParams

  public setActivatedRouteRoot(root: ActivatedRoute): void {
    this.root = root;
    this.routeEvent.next(root);
  }

  public getActivatedRouteRoot(): ActivatedRoute {
    return this.root;
  }
}
