import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Form } from '@core/types';
import { Todo } from '@core/interfaces';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { TODO_IMPORT } from './todo-form.import';

@Component({
  standalone: true,
  imports: TODO_IMPORT,
  selector: 'app-todo-form',
  templateUrl: './todo-form.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  @Input()
  get canDelete(): boolean {
    return this._canDelete;
  }
  set canDelete(canDelete: BooleanInput) {
    this._canDelete = coerceBooleanProperty(canDelete);
  }

  private _canDelete = false;

  @Output()
  readonly submit = new EventEmitter<Todo>();

  @Output()
  readonly delete = new EventEmitter<Todo>();

  readonly form: FormGroup = new FormGroup<Form<Todo>>({
    id: new FormControl<number | null>(null),
    title: new FormControl<string>(''),
    body: new FormControl<string>(''),
  });

  get isSubmitDisabled(): boolean {
    return this.form.invalid || this.form.pristine;
  }

  onSubmit() {
    this.submit.emit(this.form.value as Todo);
  }

  onDelete() {
    this.delete.emit(this.form.value as Todo);
  }
}