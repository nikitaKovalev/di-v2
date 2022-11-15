import { InjectionToken } from '@angular/core';
import { BaseCrudApi } from '@core/api';

export const API = new InjectionToken<BaseCrudApi<any>>('an abstraction over api');