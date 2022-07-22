import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  constructor(
    private router: Router,

    private breadcrumbService: BreadcrumbService
  ) {}

  search(params: {
    selectCategory: string;
    selectCity?: string;
    selectTheme?: string;
  }) {
    const { selectCategory, selectCity, selectTheme } = params;

    this.router.navigate([`${selectCategory}`, 'Result'], {
      queryParams: {
        category: selectCategory,
        city: selectCity,
        theme: selectTheme,
        page: 0,
      },
    });

    this.breadcrumbService.setQueryParams.next({
      queryParams: {
        category: selectCategory,
        city: selectCity,
        theme: selectTheme,
        page: 0,
      },
    });
  }
}
