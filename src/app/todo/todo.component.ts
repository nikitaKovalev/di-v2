import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { fadeInUp, listStagger } from '@core/animations';
import { TodoApi } from '@core/api';
import { Todo } from '@core/interfaces';
import { Router } from '@angular/router';
import { SEARCH_CONTROL } from '@core/tokens';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { startWith } from 'rxjs';

@Component({
  templateUrl: './todo.template.html',
  styleUrls: ['./todo.style.scss'],
  animations: [listStagger, fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  readonly todos$ = this._control.valueChanges.pipe(
    startWith(''),
    switchMap((value: string) => this._todoApi.search(value, 'title')),
  );

  readonly trackByFn = (_: number, { id }: Todo): number => id;

  private readonly _router: Router = inject(Router);
  private readonly _todoApi: TodoApi = inject(TodoApi);

  constructor(
    @Inject(SEARCH_CONTROL) private readonly _control: FormControl<string>,
  ) {}

  onEdit(todo: Todo): void {
    this._router.navigate([this._router.url, 'edit', todo.id]);
  }

  onDelete(id: number): void {
    //
  }
}