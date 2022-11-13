import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `<mat-spinner [color]="color" [mode]="mode"></mat-spinner>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input()
  color: ThemePalette;

  @Input()
  mode!: ProgressSpinnerMode;
}