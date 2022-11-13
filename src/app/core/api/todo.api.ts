import { BaseCrudApi } from '@core/api/base-crud.api';
import { Todo } from '@core/interfaces';
import { Injectable } from '@angular/core';
import { TODOS_MOCKS } from '@core/mocks/todos';

@Injectable({ providedIn: 'root' })
export class TodoApi extends BaseCrudApi<Todo> {
  protected _items: Todo[] = TODOS_MOCKS;
}