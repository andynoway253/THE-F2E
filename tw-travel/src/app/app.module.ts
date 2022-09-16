import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewModule } from './view/view.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/module/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './shared/service/config.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,

    ViewModule,

    AppRoutingModule,

    FormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () =>
        configService.getToken(),
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
