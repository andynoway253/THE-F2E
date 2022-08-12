import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../api/base.api';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class DataService extends BaseApi {
  constructor(http: HttpClient, configService: ConfigService) {
    super(http, configService);
  }

  getDataAll(params: { category: string }): Observable<Array<any>> {
    //  目前想不到怎麼隨機取號
    return this.get(`${params.category}?%24top=4`);
  }

  getData(params: { category: string; theme: string }): Observable<Array<any>> {
    return this.get(
      `${params.category}?$filter=${
        params.category === 'Restaurant' ? 'Class' : 'Class1'
      } eq '${params.theme}'`
    );
  }

  getDataByName(params: {
    category: string;
    name: string;
  }): Observable<Array<any>> {
    return this.get(
      `${params.category}?$filter=${params.category + 'Name'} eq '${
        params.name
      }'`
    );
  }

  getDataByCity(params: { category: string; city: string; theme?: string }) {
    const { category, city, theme } = params;

    if (theme) {
      return this.get(
        `${category}/` +
          `${city}?$filter=${
            params.category === 'Restaurant' ? 'Class' : 'Class1'
          } eq ` +
          `'${theme}'`
      );
    } else {
      return this.get(`${category}/` + `${city}`);
    }
  }
}
