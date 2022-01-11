import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';

@NgModule({
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
  imports: [CommonModule, RouterModule, FlexLayoutModule, MatButtonModule],
  providers: [BreadcrumbService],
})
export class BreadcrumbModule {}
