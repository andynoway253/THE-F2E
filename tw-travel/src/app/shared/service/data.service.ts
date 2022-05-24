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

  getScenicSpot(params: { theme: any }): Observable<Array<any>> {
    return this.get(`ScenicSpot?$filter=Class1 eq '${params.theme}'`);
  }

  getRestaurant(params: { theme: any }): Observable<Array<any>> {
    return this.get(`Restaurant?$filter=Class eq '${params.theme}'`);
  }

  getActivity(params: { theme: any }): Observable<Array<any>> {
    return this.get(`Activity?$filter=Class1 eq '${params.theme}'`);
  }

  // getData(params: { category: string; theme: string }) {
  //   const { category, theme } = params;

  //   return this.get(`${category}?$filter=Class1 eq '${theme}'`);
  // }

  getDataByCity(params: { category: string; city: any; theme?: any | null }) {
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
