import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserApi } from '@core/api/user.api';
import { Observable, tap } from 'rxjs';
import { User } from '@core/interfaces';
import { fadeInUp } from '@core/animations';
import { getItemById } from '@core/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from '@core/types';

@Component({
  templateUrl: './user-details.component.html',
  animations: [fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  readonly user$: Observable<User> = getItemById<User, UserApi>(UserApi).pipe(
    tap((user: User) =>
      this.form.patchValue(user, { emitEvent: false })
    ),
  );

  readonly form = new FormGroup<Form<User>>({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    phone: new FormControl<string>(''),
    website: new FormControl<string>(''),
  });

  private readonly _userApi = inject(UserApi);

  onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const { id, ...user } = this.form.value;

    this._userApi.update(id!, user)
      .pipe()
      .subscribe()
  }
}
