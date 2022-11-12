import { Injectable } from '@angular/core';

import { BaseCrudApi } from '../api/base-crud.api';
import { User } from '../interfaces';
import { MOCK_USERS } from '@core/mocks';

@Injectable({ providedIn: 'root' })
export class UserApi extends BaseCrudApi<User> {
  protected _items: User[] = MOCK_USERS;
}