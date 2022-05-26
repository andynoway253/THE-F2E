import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../api/base.api';

@Injectable({
  providedIn: 'root',
})
export class DataService extends BaseApi {
  constructor(http: HttpClient) {
    super(http);
  }

  getDataAll(params: { category: string }): Observable<Array<any>> {
    return this.get(`${params.category}?%24top=4`);
  }

  getData(params: { category: string; theme: string }): Observable<Array<any>> {
    return this.get(`${params.category}?$filter=Class1 eq '${params.theme}'`);
  }

  getDataByCity(params: { category: string; city: string; theme?: string }) {
    const { category, city, theme } = params;

    if (theme) {
      return this.get(
        `${category}/` + `${city}?$filter=Class1 eq ` + `'${theme}'`
      );
    } else {
      return this.get(`${category}/` + `${city}`);
    }
  }
}
