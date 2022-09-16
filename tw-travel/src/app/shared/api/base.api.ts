import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AlertMessageService } from '../component/alert-message/alert-message.service';
import { ConfigService } from '../service/config.service';

@Injectable({
  providedIn: 'root',
})
export class BaseApi {
  constructor(private injector: Injector) {
    this.alertMessageService = this.injector.get(AlertMessageService);

    this.http = this.injector.get(HttpClient);

    this.configService = this.injector.get(ConfigService);
  }

  protected alertMessageService: AlertMessageService;

  protected http: HttpClient;

  private configService: ConfigService;

  baseUrl = 'https://tdx.transportdata.tw/api/basic/v2/Tourism/';

  get(url: string): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + url, {
        headers: {
          'Content-Type': 'application/json',
          authorization: ` ${
            this.configService.config.token_type +
            ' ' +
            this.configService.config.access_token
          }`,
        },
      })
      .pipe(
        catchError((err) => of(err)),
        switchMap((res) => {
          if (res.error) {
            this.alertMessageService.showError(res.error.message);
            return throwError(() => res);
          }
          return of(res);
        })
      );
  }
}
