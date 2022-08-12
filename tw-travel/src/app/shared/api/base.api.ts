import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ConfigService } from '../service/config.service';

@Injectable({
  providedIn: 'root',
})
export class BaseApi {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  baseUrl = 'https://tdx.transportdata.tw/api/basic/v2/Tourism/';

  get(url: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + url, {
      headers: {
        'Content-Type': 'application/json',
        authorization: ` ${
          this.configService.config.token_type +
          ' ' +
          this.configService.config.access_token
        }`,
      },
    });
  }
}
