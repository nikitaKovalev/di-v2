import { Inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

type Snackbar = 'info' | 'success' | 'warning' | 'error';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private readonly _config: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(@Inject(MatSnackBar) private readonly _snackbar: MatSnackBar) {
    this._config.duration = 2000;
    this._config.horizontalPosition = 'end';
    this._config.verticalPosition = 'top';
  }

  open(
    message: string,
    type: Snackbar = 'info',
    duration = 2000
  ): MatSnackBarRef<SimpleSnackBar> {
    this._config.duration = duration;
    this._config.panelClass = ['snackbar', `snackbar--${type}`];

    return this._snackbar.open(message, void 0, this._config);
  }
}