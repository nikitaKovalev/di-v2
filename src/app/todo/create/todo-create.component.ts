import {ChangeDetectionStrategy, Component, Inject, OnDestroy} from '@angular/core';
import {TodoFormComponent} from '../form/todo-form.component';
import {Todo} from '@core/interfaces';
import {fadeInUp} from '@core/animations';
import {TodoApi} from '@core/api';
import {Location} from '@angular/common';
import {SpinnerService} from '@common/spinner';
import {SnackbarService} from '@core/services/snackbar.service';
import {finalize, Subject, takeUntil} from 'rxjs';

@Component({
  standalone: true,
  imports: [TodoFormComponent],
  template: `<app-todo-form @fadeInUp (submit)="onCreateTodo($event)"></app-todo-form>`,
  animations: [fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateComponent implements OnDestroy {
  private readonly _destroyed$ = new Subject<void>();

  constructor(
    @Inject(TodoApi) private readonly _todoApi: TodoApi,
    @Inject(Location) private readonly _location: Location,
    @Inject(SpinnerService) private readonly _spinner: SpinnerService,
    @Inject(SnackbarService) private readonly _snackbar: SnackbarService,
  ) {}

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  onCreateTodo(todo: Todo): void {
    this._spinner.open();
    this._todoApi.create(todo)
      .pipe(
        finalize(() => this._spinner.close()),
        takeUntil(this._destroyed$)
      )
      .subscribe({
        next: () => {
          this._snackbar.open('Todo created', 'success');
          this._location.back();
        },
        error: () => this._snackbar.open('Todo creation failed', 'error'),
      });
  }
}
