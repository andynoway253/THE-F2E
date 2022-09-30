import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  map,
  catchError,
  of,
  Observable,
  BehaviorSubject,
  switchMap,
  throwError,
} from 'rxjs';
import { DataService } from 'src/app/shared';
import { AlertMessageService } from 'src/app/shared/component/alert-message/alert-message.service';
import { BreadcrumbService } from 'src/app/shared/component/breadcrumb/breadcrumb.service';
import { CITYLIST } from 'src/app/shared/model/data.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,

    private route: ActivatedRoute,

    private bottomSheet: MatBottomSheet,

    private snackBar: MatSnackBar,

    private alertMessageService: AlertMessageService,

    private breadcrumbService: BreadcrumbService,

    private dataService: DataService
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

  @ViewChild('test') test: any;

  apiLoaded: Observable<boolean>;

  options: google.maps.MapOptions;

  markerOptions: google.maps.MarkerOptions = { draggable: false };

  markerPositions: google.maps.LatLngLiteral[] = [];

  detailData: any;

  category = '';

  page: any;

  more: Array<any> = [];

  slidesSubject$ = new BehaviorSubject<Array<{ image: string; alt: string }>>(
    []
  );

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((queryParams: any) => {
          const { category, city, theme, name, page } = queryParams.params; // 當前分類
          this.category = category;
          this.page = page;

          this.breadcrumbService.setRouterParams.next({
            queryParams: {
              category: category,
              city: city,
              theme: theme.replace('類', ''),
              page: page,
            },
          });

          return this.dataService
            .getDataByName({ category, name })
            .pipe(map((res) => ({ data: res, category, name, theme })));
        }),
        switchMap((res) => {
          const { data, category, theme } = res;
          const slides = [];
          this.detailData = data.map((item) => ({
            ...item,
            Name: item[`${category}Name`],
          }))[0];

          const { Address, City, Position, Picture } = this.detailData;

          //  有些資料沒有 city屬性
          const cityEng = City
            ? CITYLIST.filter((item) => item.label === City)[0].value
            : Address
            ? CITYLIST.filter((item) => item.label === Address.substr(0, 3))[0]
                .value
            : null;

          if (Picture.PictureUrl1) {
            slides.push({
              image: Picture.PictureUrl1,
              alt: Picture.PictureDescription1,
            });
          }

          if (Picture.PictureUrl2) {
            slides.push({
              image: Picture.PictureUrl2,
              alt: Picture.PictureDescription2,
            });
          }

          if (Picture.PictureUrl3) {
            slides.push({
              image: Picture.PictureUrl3,
              alt: Picture.PictureDescription3,
            });
          }

          if (slides.length) {
            this.slidesSubject$.next(slides);
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
          return throwError(() => '公開資料缺少資料');
        })
      )
      .subscribe({
        next: (res) => {
          this.getRandomData(res);
        },
        error: (err) => {
          this.alertMessageService.showError(err);
        },
      });
  }

  getRandomData(data: Array<any>) {
    let json = [];
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

  toTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  openBottomSheet() {
    this.bottomSheet.open(this.test);
  }

  openSnackBar() {
    this.snackBar.open('尚未實作', '關閉', { duration: 1000 });
  }
}
