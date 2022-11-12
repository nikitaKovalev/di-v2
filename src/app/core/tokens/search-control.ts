import { InjectionToken } from '@angular/core';
import { FormControl } from '@angular/forms';

export const SEARCH_CONTROL = new InjectionToken<FormControl<string | null>>(
  'Search control',
  { providedIn: 'root', factory: () => new FormControl<string>(''), },
);