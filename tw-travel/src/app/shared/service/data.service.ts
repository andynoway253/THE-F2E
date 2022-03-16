import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BaseService } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class DataService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getScenicSpotAll(): Observable<Array<any>> {
    return this.get('v2/Tourism/ScenicSpot?%24top=4&%24format=JSON');
  }

  getScenicSpotCity(city: string): Observable<Array<any>> {
    return this.get('/v2/Tourism/ScenicSpot/' + `${city}`);
  }

  getScenicSpot(params: { theme: string }): Observable<Array<any>> {
    return this.get(
      `/v2/Tourism/ScenicSpot?$filter=Class1 eq '${params.theme}'`
    );
  }

  getRestaurantAll(): Observable<Array<any>> {
    return this.get('/v2/Tourism/Restaurant?%24top=4&%24format=JSON');
  }

  getRestaurantCity(city: string): Observable<Array<any>> {
    return this.get('/v2/Tourism/Restaurant/' + `${city}`);
  }

  getRestaurant(params: { theme: string }): Observable<Array<any>> {
    return this.get(
      `/v2/Tourism/Restaurant?$filter=Class eq '${params.theme}'`
    );
  }

  getHotelAll(): Observable<Array<any>> {
    return this.get('/v2/Tourism/Hotel?%24top=4&%24format=JSON');
  }

  getHotelCity(city: string): Observable<Array<any>> {
    return this.get('/v2/Tourism/Hotel/' + `${city}`);
  }

  getActivityAll(): Observable<Array<any>> {
    return this.get('v2/Tourism/Activity?%24top=4&%24format=JSON');
  }

  getActivityCity(city: string): Observable<Array<any>> {
    return this.get('/v2/Tourism/Activity/' + `${city}`);
  }

  getActivity(params: { theme: string }): Observable<Array<any>> {
    return this.get(`/v2/Tourism/Activity?$filter=Class1 eq '${params.theme}'`);
  }
}
