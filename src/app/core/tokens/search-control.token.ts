import { InjectionToken } from '@angular/core';
import { FormControl } from '@angular/forms';

export const SEARCH_CONTROL = new InjectionToken<FormControl<string | null>>(
  'an abstraction over search control in crud service',
  {
    providedIn: 'root',
    factory: () => new FormControl<string | null>(''),
  }
);