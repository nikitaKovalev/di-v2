import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export abstract class BaseCrudApi<T> {
  protected abstract readonly _suffix: string;
  protected readonly _http: HttpClient = inject(HttpClient);

  create<Body>(data: Body): Observable<T> {
    return this._http.post<T>(
      `assets/mocks/${this._suffix}`,
      data
    );
  }

  search(): Observable<T[]> {
    return this._http.get<T[]>(
      `assets/mocks/${this._suffix}`
    );
  }

  findOne(id: string): Observable<T> {
    return this._http.get<T[]>(
      `assets/mocks/${this._suffix}`
    )
      .pipe(
        map((items: T[]) => {
          const item = items.find((i: T) => (i as any)['id'] == id);

          return item!;
        }),
      );
  }

  update<Body>(id: string | number, data: Body): Observable<T> {
    return this._http.put<T>(
      `assets/mocks/${this._suffix}/${id}`,
      data
    );
  }

  delete(id: string): Observable<T> {
    return this._http.delete<T>(
      `assets/mocks/${this._suffix}/${id}`
    );
  }
}