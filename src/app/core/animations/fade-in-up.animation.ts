import { animate, animation, keyframes, style, transition, trigger, useAnimation } from '@angular/animations';

const _fadeInUp = animation([
  style({ opacity: 0 }),
  animate(
    200,
    keyframes([
      style({ opacity: 0, transform: 'translate(0px, 50px)' }),
      style({ opacity: 1, transform: 'translate(0px, 0px)' }),
    ])
  ),
]);

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', useAnimation(_fadeInUp)),
]);