import { FormControl } from '@angular/forms';

export type Form<T> = {
  [key in keyof Partial<T>]: FormControl<T[key] | null>;
};