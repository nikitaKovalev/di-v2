import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { fadeInUp, listStagger } from '@core/animations';
import { Todo } from '@core/interfaces';
import { Router } from '@angular/router';
import { CrudService } from '@core/services/crud.service';
import { API } from '@core/tokens';
import { TodoApi } from '@core/api';
import { MESSAGES } from '@core/tokens/messages.token';

@Component({
  templateUrl: './todo.template.html',
  styleUrls: ['./todo.style.scss'],
  animations: [listStagger, fadeInUp],
  providers: [
    CrudService,
    { provide: API, useExisting: TodoApi },
    {
      provide: MESSAGES,
      useValue: {
      successEdit: 'Todo has been successfully edited',
      successDelete: 'Todo has been successfully deleted',
      successCreate: 'Todo has been successfully created',
      errorEdit: 'Todo has not been edited',
      errorDelete: 'Todo has not been deleted',
      errorCreate: 'Todo has not been created',
      confirmDelete: 'Are you sure you want to delete this todo?',
      delete: 'Delete',
      },
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  readonly todos$ = this._crudService.list$('title');

  readonly trackByFn = (_: number, { id }: Todo): number => id;

  constructor(
    @Inject(Router) private readonly _router: Router,
    @Inject(CrudService) private readonly _crudService: CrudService<Todo>,
  ) {}

  onEdit(todo: Todo): void {
    this._router.navigate([this._router.url, 'edit', todo.id]);
  }

  onDelete(id: number): void {
    this._crudService.delete(id, () => this._crudService.search());
  }
}