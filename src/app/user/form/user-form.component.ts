import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from '@core/types';
import { User } from '@core/interfaces';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { USER_FORM_IMPORT } from './user-form.import';

@Component({
  standalone: true,
  imports: USER_FORM_IMPORT,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  @Input('user')
  set patchForm(user: User) {
    this.form.patchValue(user, { emitEvent: false });
  }

  @Input()
  get canDelete(): boolean {
    return this._canDelete;
  }
  set canDelete(canDelete: BooleanInput) {
    this._canDelete = coerceBooleanProperty(canDelete);
  }

  private _canDelete = false;

  @Output()
  readonly submit = new EventEmitter<User>();

  @Output()
  readonly delete = new EventEmitter<User>();

  readonly form = new FormGroup<Form<User>>({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    phone: new FormControl<string>(''),
    website: new FormControl<string>(''),
    photo: new FormControl<string>(''),
  });

  get photoControl(): AbstractControl {
    return this.form.get('photo')!;
  }

  get isSubmitDisabled(): boolean {
    return this.form.invalid || this.form.pristine;
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.submit.emit(this.form.value as User);
  }

  onDelete(): void {
    this.delete.emit(this.form.value as User);
  }
}