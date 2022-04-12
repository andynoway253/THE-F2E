import { ThisReceiver } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  constructor() {}

  @Input() slides: Array<{ image: string; alt: string }> = [];

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: false,
    navigation: true,
    pagination: true,
  };

  ngOnInit() {
    this.slides = this.slides.length
      ? this.slides
      : [
          { image: 'https://fakeimg.pl/1040x400/', alt: '' },
          { image: 'https://fakeimg.pl/1040x400/', alt: '' },
          { image: 'https://fakeimg.pl/1040x400/', alt: '' },
        ];
  }

  ngAfterViewInit() {}

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
