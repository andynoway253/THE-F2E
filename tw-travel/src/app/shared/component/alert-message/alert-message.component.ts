import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
})
export class AlertMessageComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; style: string; content: string }
  ) {}

  ngOnInit() {}
}
