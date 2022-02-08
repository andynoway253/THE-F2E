import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared';

@Injectable()
export class RestaurantService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getRestaurant(params: { theme: string }) {
    return this.get(
      `/v2/Tourism/Restaurant?$filter=Class eq '${params.theme}'`
    );
  }
}
