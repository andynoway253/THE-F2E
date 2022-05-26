import { AlertMessageService } from './../../shared/component/alert-message/alert-message.service';
import { CITYLIST } from './../../shared/model/data.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { DataService } from 'src/app/shared/service/data.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,

    private route: ActivatedRoute,

    private dataService: DataService,

    private alertMessageService: AlertMessageService
  ) {
    this.apiLoaded = this.httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyB7S4gvD6MD_FoDchVRATTCa9vXDpOAmag',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  apiLoaded: Observable<boolean>;

  options: google.maps.MapOptions;

  markerOptions: google.maps.MarkerOptions = { draggable: false };

  markerPositions: google.maps.LatLngLiteral[] = [];

  category: string;

  detailData: any;

  more: Array<any> = [];

  slides: Array<{ image: string; alt: string }> = [];

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((queryParams: any) => {
          const { category, name, theme } = queryParams.params;
          this.category = category;

          return this.dataService
            .getData({ category, theme })
            .pipe(map((res) => ({ data: res, category, name, theme })));
        }),
        switchMap((res) => {
          const { data, category, name, theme } = res;

          this.detailData = data
            .filter((item) => item[`${category}Name`] === name)
            .map((item) => ({
              ...item,
              Name: item[`${category}Name`],
            }))[0];

          const { Address, City, Position, Picture } = this.detailData;
          const cityEng = City
            ? CITYLIST.filter((item) => item.label === City)[0].value
            : Address
            ? CITYLIST.filter((item) => item.label === Address.substr(0, 3))[0]
                .value
            : null;

          if (Picture.PictureUrl1) {
            this.slides.push({
              image: Picture.PictureUrl1,
              alt: Picture.PictureDescription1,
            });
          }

          if (Picture.PictureUrl2) {
            this.slides.push({
              image: Picture.PictureUrl2,
              alt: Picture.PictureDescription2,
            });
          }

          if (Picture.PictureUrl3) {
            this.slides.push({
              image: Picture.PictureUrl3,
              alt: Picture.PictureDescription3,
            });
          }

          this.options = {
            center: { lat: Position.PositionLat, lng: Position.PositionLon },
            zoom: 15,
          };

          this.markerPositions.push({
            lat: Position.PositionLat,
            lng: Position.PositionLon,
          });

          if (cityEng) {
            return this.dataService.getDataByCity({
              category: category,
              city: cityEng,
              theme: theme,
            });
          }

          return throwError(() => new Error());
        })
      )
      .subscribe({
        next: (res) => {
          this.getRandomData(res);
        },
        error: (msg) => {
          if (msg.error.message) {
            this.alertMessageService.showError(msg.error.message);
            return;
          }

          this.alertMessageService.showError('公開資料缺少資料');
        },
      });
  }

  getRandomData(data: Array<any>) {
    let json: any = {};
    this.more = [];
    if (data.length <= 4) {
      this.more = data;
    } else {
      while (this.more.length < 4) {
        let i = Math.round(Math.random() * data.length);
        if (!json[i] && data[i]) {
          json[i] = true;
          this.more.push(data[i]);
        }
      }
    }
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
}
