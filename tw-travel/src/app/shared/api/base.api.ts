import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApi {
  constructor(private http: HttpClient) {}

  // post(url: string): Observable<any> {
  //   return this.http.post<any>(url);
  // }

  baseUrl = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/';

  get(url: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + url);
  }
}
