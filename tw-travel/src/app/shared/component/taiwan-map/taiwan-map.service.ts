import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaiwanMaplComponent } from './taiwan-map.component';

@Injectable({
  providedIn: 'root',
})
export class TaiwanMapService {
  constructor(private dialog: MatDialog) {}

  open() {
    this.dialog.open(TaiwanMaplComponent, {
      width: '50vw',
      height: '90vh',
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
