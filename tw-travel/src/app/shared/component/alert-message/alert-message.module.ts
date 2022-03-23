import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../..';
import { AlertMessageComponent } from './alert-message.component';
import { AlertMessageService } from './alert-message.service';

@NgModule({
  declarations: [AlertMessageComponent],
  exports: [AlertMessageComponent],
  imports: [CommonModule, FormsModule, FlexLayoutModule, MaterialModule],
  providers: [AlertMessageService],
})
export class AlertMessageModule {}
