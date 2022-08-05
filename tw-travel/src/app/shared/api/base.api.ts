import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApi {
  constructor(private http: HttpClient) {}

  post(): Observable<any> {
    const client_id = 'andynoway253-834f9eb2-fe11-4ca6';
    const client_secret = '6ab0b37f-6d48-4cbb-86cc-771a5320a150';
    const body = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`;

    return this.http.post<any>(
      'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
      body,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  baseUrl = 'https://tdx.transportdata.tw/api/basic/v2/Tourism/';

  get(url: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + url);
  }
}
