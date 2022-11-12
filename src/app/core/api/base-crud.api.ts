import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export abstract class BaseCrudApi<T> {
  protected abstract _items: T[];

  create<Body>(data: Body): Observable<T> {
    this._items.push({ ...data, id: this._items.length + 1 } as any);

    return of(data as any);
  }

  search(value?: string, searchKey?: keyof T): Observable<T[]> {
    return of(this._items)
      .pipe(
        map((items: T[]) => {
          if (!value) {
            return items;
          }

          return items.filter((i: T) => {
            const item = i as any;

            return item[searchKey].toLowerCase().includes(value.toLowerCase());
          });
        })
      )
  }

  findOne(id: string): Observable<T> {
    return of(this._items)
      .pipe(
        map((items: T[]) => {
          const item = items.find((i: T) => (i as any)['id'] == id);

          return item!;
        }),
      );
  }

  update<Body>(id: string | number, data: Body): Observable<T> {
    const item = this._items.find((i: T) => (i as any)['id'] == id);

    this._items.splice(this._items.indexOf(item!), 1, { ...item, ...data as any });

    return of(data as any);
  }

  delete(id: string | number): Observable<T> {
    const item = this._items.find((i: T) => (i as any)['id'] == id);

    this._items.splice(this._items.indexOf(item!), 1);

    return of(item!);
  }
}