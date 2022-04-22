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

  getScenicSpotAll(): Observable<Array<any>> {
    return this.get('ScenicSpot?%24top=4');
  }

  getScenicSpotByCity(params: { city: any }): Observable<Array<any>> {
    return this.get('ScenicSpot/' + `${params.city}`);
  }

  getScenicSpot(params: { theme: any }): Observable<Array<any>> {
    return this.get(`ScenicSpot?$filter=Class1 eq '${params.theme}類'`);
  }

  getRestaurantAll(): Observable<Array<any>> {
    return this.get('Restaurant?%24top=4');
  }

  getRestaurantByCity(params: { city: any }): Observable<Array<any>> {
    return this.get('Restaurant/' + `${params.city}`);
  }

  getRestaurant(params: { theme: any }): Observable<Array<any>> {
    return this.get(`Restaurant?$filter=Class eq '${params.theme}'`);
  }

  getActivityAll(): Observable<Array<any>> {
    return this.get('Activity?%24top=4');
  }

  getActivityByCity(params: {
    city: any;
    theme?: any;
  }): Observable<Array<any>> {
    if (params.theme) {
      return this.get(
        'Activity/' +
          `${params.city}?` +
          '$filter=Class1 eq ' +
          `'${params.theme}'`
      );
    } else {
      return this.get('Activity/' + `${params.city}`);
    }
  }

  getActivity(params: { theme: any }): Observable<Array<any>> {
    return this.get(`Activity?$filter=Class1 eq '${params.theme}'`);
  }
}
