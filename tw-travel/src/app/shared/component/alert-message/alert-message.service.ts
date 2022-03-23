import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertMessageComponent } from './alert-message.component';

@Injectable()
export class AlertMessageService {
  constructor(private dialogRef: MatDialog) {}

  showSuccess(content: string, title = '成功', style = 'primary') {
    return this.open({
      content,
      title,
      style,
    });
  }

  showWarning(content: string, title = '警告', style = 'warn') {
    console.log(title);
    return this.open({
      content,
      title,
      style,
    });
  }

  showError(content: string, title = '錯誤', style = 'accent') {
    return this.open({
      content,
      title,
      style,
    });
  }

  private open(params: any) {
    return this.dialogRef
      .open(AlertMessageComponent, {
        width: '400px',
        disableClose: true,
        data: params,
      })
      .afterClosed();
  }
}
