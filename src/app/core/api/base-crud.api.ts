import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class BaseCrudApi<T> {
  protected abstract readonly _suffix: string;
  protected readonly _http: HttpClient = inject(HttpClient);

  create<Body>(data: Body): Observable<T> {
    return this._http.post<T>(
      `https://jsonplaceholder.typicode.com/${this._suffix}`,
      data
    );
  }

  search(): Observable<T[]> {
    return this._http.get<T[]>(
      `https://jsonplaceholder.typicode.com/${this._suffix}`
    );
  }

  findOne(id: string): Observable<T> {
    return this._http.get<T>(
      `https://jsonplaceholder.typicode.com/${this._suffix}/${id}`
    );
  }

  update<Body>(id: string, data: Body): Observable<T> {
    return this._http.put<T>(
      `https://jsonplaceholder.typicode.com/${this._suffix}/${id}`,
      data
    );
  }

  delete(id: string): Observable<T> {
    return this._http.delete<T>(
      `https://jsonplaceholder.typicode.com/${this._suffix}/${id}`
    );
  }
}