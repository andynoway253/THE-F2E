import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared';

@Injectable()
export class IndexService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getScenicSpot() {
    return this.get('v2/Tourism/ScenicSpot?%24top=4&%24format=JSON');
  }

  getScenicSpotCity(city: string) {
    return this.get('/v2/Tourism/ScenicSpot/' + `${city}`);
  }

  getRestaurant() {
    return this.get('/v2/Tourism/Restaurant?%24top=4&%24format=JSON');
  }

  getRestaurantCity(city: string) {
    return this.get('/v2/Tourism/Restaurant/' + `${city}`);
  }

  getHotel() {
    return this.get('/v2/Tourism/Hotel?%24top=4&%24format=JSON');
  }

  getHotelCity(city: string) {
    return this.get('/v2/Tourism/Hotel/' + `${city}`);
  }

  getActivity() {
    return this.get('v2/Tourism/Activity?%24top=4&%24format=JSON');
  }

  getActivityCity(city: string) {
    return this.get('/v2/Tourism/Activity/' + `${city}`);
  }
}
