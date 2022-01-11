import { Component } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  constructor() {}

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: false,
    navigation: true,
    pagination: true,
  };

  slides = [
    'https://fakeimg.pl/1040x400/',
    'https://fakeimg.pl/1040x400/',
    'https://fakeimg.pl/1040x400/',
  ];

  ngOnInit() {}

  ngAfterViewInit() {}

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
