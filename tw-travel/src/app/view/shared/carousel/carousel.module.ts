import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { CarouselComponent } from './carousel.component';
import { SwiperModule } from 'ngx-swiper-wrapper';

const COMPONENT = [CarouselComponent];

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  autoplay: false,
};

@NgModule({
  declarations: [COMPONENT],
  exports: [COMPONENT],
  imports: [BrowserModule, SwiperModule],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
  bootstrap: [],
})
export class CarouselModule {}
