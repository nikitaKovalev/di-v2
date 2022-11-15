import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { fadeInUp, listStagger } from '@core/animations';
import { TodoApi } from '@core/api';
import { Todo } from '@core/interfaces';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { finalize, startWith, Subject } from 'rxjs';
import { SpinnerService } from '@common/spinner';
import { SnackbarService } from '@core/services/snackbar.service';
import { ConfirmService } from '@common/confirm';

@Component({
  templateUrl: './todo.template.html',
  styleUrls: ['./todo.style.scss'],
  animations: [listStagger, fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  private readonly _search$ = new Subject<void>();

  readonly todos$ = this._search$.asObservable().pipe(
    startWith(''),
    switchMap(() => this._todoApi.search()),
  );

  readonly trackByFn = (_: number, { id }: Todo): number => id;

  constructor(
    @Inject(Router) private readonly _router: Router,
    @Inject(TodoApi) private readonly _todoApi: TodoApi,
    @Inject(SpinnerService) private readonly _spinner: SpinnerService,
    @Inject(SnackbarService) private readonly _snackbar: SnackbarService,
    @Inject(ConfirmService) private readonly _confirm: ConfirmService,
  ) {}

  onEdit(todo: Todo): void {
    this._router.navigate([this._router.url, 'edit', todo.id]);
  }

  onDelete(id: number): void {
    this._confirm.delete('You are about to delete todo', 'Are you sure you wish to proceed?')
      .pipe(
        tap(() => this._spinner.open()),
        switchMap(() => this._todoApi.delete(id)),
        finalize(() => this._spinner.close()),
      )
      .subscribe({
        next: () => {
          this._snackbar.open('Todo deleted', 'success');
          this._search$.next();
        },
        error: () => this._snackbar.open('Todo not deleted', 'error'),
      })
  }
}