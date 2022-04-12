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

  getScenicSpotByCity(params: { city: string }): Observable<Array<any>> {
    return this.get('/v2/Tourism/ScenicSpot/' + `${params.city}`);
  }

  getScenicSpot(params: { theme: string }): Observable<Array<any>> {
    return this.get(
      `/v2/Tourism/ScenicSpot?$filter=Class1 eq '${params.theme}'`
    );
  }

  getRestaurantAll(): Observable<Array<any>> {
    return this.get('/v2/Tourism/Restaurant?%24top=4&%24format=JSON');
  }

  getRestaurantByCity(params: { city: string }): Observable<Array<any>> {
    return this.get('/v2/Tourism/Restaurant/' + `${params.city}`);
  }

  getRestaurant(params: { theme: string }): Observable<Array<any>> {
    return this.get(
      `/v2/Tourism/Restaurant?$filter=Class eq '${params.theme}'`
    );
  }

  getActivityAll(): Observable<Array<any>> {
    return this.get('v2/Tourism/Activity?%24top=4&%24format=JSON');
  }

  getActivityByCity(params: { city: string }): Observable<Array<any>> {
    return this.get('/v2/Tourism/Activity/' + `${params.city}`);
  }

  getActivity(params: { theme: string }): Observable<Array<any>> {
    return this.get(`/v2/Tourism/Activity?$filter=Class1 eq '${params.theme}'`);
  }
}
