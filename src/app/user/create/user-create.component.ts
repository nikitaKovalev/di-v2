import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { fadeInUp } from '@core/animations';
import { User } from '@core/interfaces';
import { UserApi } from '@core/api/user.api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-create',
  template: `
    <app-user-form 
      @fadeInUp 
      (submit)="onCreateUser($event)"
    ></app-user-form>
  `,
  animations: [fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent {
  private readonly _userApi: UserApi = inject(UserApi);
  private readonly _location: Location = inject(Location);

  onCreateUser(user: User): void {
    this._userApi.create(user)
      .pipe()
      .subscribe(() => this._location.back());
  }
}