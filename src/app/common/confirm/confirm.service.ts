import { inject, Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '@common/confirm/confirm.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private readonly _dialog: MatDialog = inject(MatDialog);

  delete(
    title: string,
    message: string,
    value: string = '',
    confirmText: string = 'Delete',
    cancelText: string = 'Cancel',
    width: string = 'auto'
  ): Observable<boolean> {
    const params: MatDialogConfig = {
      width,
      minWidth: '300px',
      maxWidth: '600px',
      panelClass: ['dialog', 'dialog__delete'],
    };
    const dialogRef: MatDialogRef<ConfirmComponent> = this._dialog.open(
      ConfirmComponent,
      params
    );

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = `${message} ${value}`;
    dialogRef.componentInstance.confirmText = confirmText;
    dialogRef.componentInstance.cancelText = cancelText;

    return dialogRef.afterClosed().pipe(filter(Boolean));
  }
}