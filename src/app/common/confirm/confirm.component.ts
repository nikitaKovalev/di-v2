import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CONFRIM_IMPORTS } from '@common/confirm/confirm.imports';

@Component({
  standalone: true,
  imports: CONFRIM_IMPORTS,
  templateUrl: './confirm.template.html',
  styleUrls: ['./confirm.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent {
  @Input()
  title = '';

  @Input()
  message = '';

  @Input()
  icon = '';

  @Input()
  confirmText = '';

  @Input()
  cancelText = '';
}