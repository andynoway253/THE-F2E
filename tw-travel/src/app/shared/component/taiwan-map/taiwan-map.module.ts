import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TaiwanMaplComponent } from './taiwan-map.component';

@NgModule({
  declarations: [TaiwanMaplComponent],
  exports: [TaiwanMaplComponent],
  imports: [BrowserModule],
})
export class TaiwanMapModule {}
