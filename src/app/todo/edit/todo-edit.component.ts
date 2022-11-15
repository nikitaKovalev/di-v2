import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { TodoFormComponent } from '../form/todo-form.component';
import { Todo } from '@core/interfaces';
import { fadeInUp } from '@core/animations';
import { TodoApi } from '@core/api';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncPipe, Location } from '@angular/common';
import { SpinnerService } from '@common/spinner';
import { SnackbarService } from '@core/services/snackbar.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { ConfirmService } from '@common/confirm';

@Component({
  standalone: true,
  imports: [TodoFormComponent, AsyncPipe],
  template: `
    <app-todo-form 
      @fadeInUp
      canDelete="true"
      [todo]="(todo$ | async)!"
      (submit)="onEditTodo($event)"
      (delete)="onDeleteTodo($event)"
    ></app-todo-form>
  `,
  animations: [fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoEditComponent implements OnDestroy {
  readonly todo$: Observable<Todo> = this._activatedRoute.paramMap.pipe(
    map((params: ParamMap) => params.get('id')),
    filter(Boolean),
    switchMap((id: string) => this._todoApi.findOne(id)),
  );

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    @Inject(ActivatedRoute) private readonly _activatedRoute: ActivatedRoute,
    @Inject(TodoApi) private readonly _todoApi: TodoApi,
    @Inject(Location) private readonly _location: Location,
    @Inject(SpinnerService) private readonly _spinner: SpinnerService,
    @Inject(SnackbarService) private readonly _snackbar: SnackbarService,
    @Inject(ConfirmService) private readonly _confirm: ConfirmService,
  ) {}

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  onEditTodo(todo: Todo): void {
    this._spinner.open();
    this._todoApi.update(todo.id, todo)
      .pipe(
        finalize(() => this._spinner.close()),
        takeUntil(this._destroyed$)
      )
      .subscribe({
        next: () => {
          this._snackbar.open(`Todo ${todo.title} updated`, 'success');
          this._location.back();
        },
        error: () => this._snackbar.open(`Todo ${todo.title} update failed`, 'error'),
      });
  }

  onDeleteTodo(todo: Todo): void {
    this._confirm.delete(`Delete ${todo.title}?`, 'Are you sure you want to delete this todo?')
      .pipe(
        tap(() => this._spinner.open()),
        switchMap(() => this._todoApi.delete(todo.id)),
        finalize(() => this._spinner.close()),
        takeUntil(this._destroyed$)
      )
      .subscribe({
        next: () => {
          this._snackbar.open(`Todo ${todo.title} deleted`, 'success');
          this._location.back();
        },
        error: () => this._snackbar.open(`Todo ${todo.title} delete failed`, 'error'),
      });
  }
}