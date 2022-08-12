import { Component, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  constructor() {}

  @Input() set setImg(value: any) {
    this.slides = value;
  }

  get img() {
    return this.slides;
  }

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: false,
    navigation: true,
    pagination: true,
  };

  slides: Array<{ image: string; alt: string }> = [];

  ngOnInit() {
    this.slides = [
      {
        image: 'https://fakeimg.pl/1040x400/?text=缺少圖片&font=noto',
        alt: '',
      },
      {
        image: 'https://fakeimg.pl/1040x400/?text=缺少圖片&font=noto',
        alt: '',
      },
      {
        image: 'https://fakeimg.pl/1040x400/?text=缺少圖片&font=noto',
        alt: '',
      },
    ];
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
