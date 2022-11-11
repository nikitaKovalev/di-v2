import {
  animateChild,
  query,
  stagger,
  transition,
  trigger,
} from '@angular/animations';

export const listStagger = trigger('listStagger', [
  transition(':enter, * => *', [
    query(':enter', [stagger(50, [animateChild()])], { optional: true }),
  ]),
]);
