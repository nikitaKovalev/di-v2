import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    phone: new FormControl<string>(''),
    website: new FormControl<string>(''),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
  }
}
