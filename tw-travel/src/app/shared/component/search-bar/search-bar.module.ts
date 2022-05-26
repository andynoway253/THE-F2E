import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../..';
import { SearchBarComponent } from './search-bar.component';
import { SearchBarService } from './search-bar.service';

@NgModule({
  declarations: [SearchBarComponent],
  exports: [SearchBarComponent],
  imports: [CommonModule, FormsModule, FlexLayoutModule, MaterialModule],
  providers: [SearchBarService],
})
export class SearchBarModule {}
