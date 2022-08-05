import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { BaseApi } from '../api/base.api';

@Injectable({
  providedIn: 'root',
})
export class ConfigService extends BaseApi {
  constructor(http: HttpClient) {
    super(http);
  }

  config: any;

  getToken() {
    return this.post()
      .pipe(tap((config) => (this.config = config)))
      .toPromise();
  }
}
