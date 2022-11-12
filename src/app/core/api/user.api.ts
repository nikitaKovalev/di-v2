import { Injectable } from '@angular/core';

import { BaseCrudApi } from '../api/base-crud.api';
import { User } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class UserApi extends BaseCrudApi<User> {
  protected readonly _suffix = 'users.json';
}