import { BaseCrudApi } from '@core/api';
import { inject, ProviderToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

export function getItemById<T, C extends BaseCrudApi<T>>(
  source: ProviderToken<C>,
): Observable<T> {
  const route = inject(ActivatedRoute);
  const api = inject(source);

  return route.paramMap.pipe(
    map((params: ParamMap) => params.get('id')),
    filter(Boolean),
    switchMap((id: string) => api.findOne(id)),
  );
}