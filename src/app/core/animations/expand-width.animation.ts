import {
  animate,
  AUTO_STYLE,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const expandWidth = trigger('expandWidth', [
  transition(':enter', [
    style({ width: '0%', margin: '0px' }),
    animate('300ms ease-out', style({ width: 'inherit', margin: AUTO_STYLE })),
  ]),
  transition(':leave', [
    style({ width: 'inherit', margin: AUTO_STYLE }),
    animate('300ms ease-out', style({ width: '0%', margin: '0px' })),
  ]),
]);
