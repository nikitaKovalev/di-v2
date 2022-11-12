import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserApi } from '@core/api/user.api';
import { Observable } from 'rxjs';
import { User } from '@core/interfaces';
import { fadeInUp } from '@core/animations';
import { getItemById } from '@core/utils';
import { Location } from '@angular/common';

@Component({
  template: `
    <app-user-form
      @fadeInUp 
      canDelete="true"
      [user]="(user$ | async)!"
      (submit)="onEditUser($event)"
      (delete)="onDeleteUser($event)"
    ></app-user-form>
  `,
  animations: [fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent {
  readonly user$: Observable<User> = getItemById<User, UserApi>(UserApi);

  private readonly _userApi: UserApi = inject(UserApi);
  private readonly _location: Location = inject(Location);

  onEditUser(user: User): void {
    this._userApi.update<User>(user.id, user)
      .pipe()
      .subscribe(() => this._location.back());
  }

  onDeleteUser(user: User): void {
    this._userApi.delete(user.id)
      .pipe()
      .subscribe(() => this._location.back());
  }
}
