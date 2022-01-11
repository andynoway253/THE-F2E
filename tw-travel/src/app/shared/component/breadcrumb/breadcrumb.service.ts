import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class BreadcrumbService {
  constructor() {}

  private root: ActivatedRoute = new ActivatedRoute();

  public routeEvent = new BehaviorSubject<any>(null);

  public setActivatedRouteRoot(root: ActivatedRoute): void {
    this.root = root;
    this.routeEvent.next(root);
  }

  public getActivatedRouteRoot(): ActivatedRoute {
    return this.root;
  }
}
