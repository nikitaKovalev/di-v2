import { Inject, Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { SpinnerComponent } from '@common/spinner/spinner.component';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private readonly _positionStrategy = this._overlay
    .position()
    .global()
    .centerHorizontally()
    .centerVertically();

  private readonly _config = {
    positionStrategy: this._positionStrategy,
    hasBackdrop: true,
    color: 'primary' as ThemePalette,
    mode: 'indeterminate' as ProgressSpinnerMode,
  };

  private _overlayRef!: OverlayRef;

  constructor(@Inject(Overlay) private readonly _overlay: Overlay) {}

  open(): void {
    if (!this._overlayRef) {
      this._overlayRef = this._overlay.create(this._config);
    }

    const spinnerComponent = new ComponentPortal(SpinnerComponent);
    const overlay =
      this._overlayRef.attach<SpinnerComponent>(spinnerComponent);

    overlay.instance.color = this._config.color;
    overlay.instance.mode = this._config.mode;
    overlay.changeDetectorRef.detectChanges();
  }

  close(): void {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }
}