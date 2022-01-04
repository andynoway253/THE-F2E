import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private http: HttpClient) {}

  // post(url: string): Observable<any> {
  //   return this.http.post<any>(url);
  // }

  baseUrl = 'https://ptx.transportdata.tw/MOTC/';

  get(url: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + url);
  }
}
