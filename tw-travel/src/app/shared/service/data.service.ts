import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
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
    ).pipe(
      switchMap((res) => {
        return this.dataFormatter(res, params.category);
      })
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

    const observable = theme
      ? this.get(
          `${category}/` +
            `${city}?$filter=${
              params.category === 'Restaurant' ? 'Class' : 'Class1'
            } eq ` +
            `'${theme}'`
        )
      : this.get(`${category}/` + `${city}`);

    return observable.pipe(
      switchMap((res) => {
        return this.dataFormatter(res, params.category);
      })
    );
  }

  dataFormatter(data: any[], category: string) {
    return of(
      data.map((item: any, idx: number) => {
        return {
          ...item,
          id: idx,
          name: item[`${category}Name`],
          class: item.Class
            ? item.Class
            : item.Class1
            ? item.Class1
            : item.Class2
            ? item.Class2
            : '其他類',
        };
      })
    );
  }
}
