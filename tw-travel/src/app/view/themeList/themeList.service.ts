import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared';

@Injectable()
export class ThemeListService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getActivity(params: { theme: string }) {
    return this.get(`/v2/Tourism/Activity?$filter=Class1 eq '${params.theme}'`);
  }

  getRestaurant(params: { theme: string }) {
    return this.get(
      `/v2/Tourism/Restaurant?$filter=Class eq '${params.theme}'`
    );
  }

  getScenicSpot(params: { theme: string }) {
    return this.get(
      `/v2/Tourism/ScenicSpot?$filter=Class1 eq '${params.theme + '類'}'`
    );
  }
}
