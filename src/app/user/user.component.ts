import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { UserApi } from '@core/api/user.api';
import { finalize, Observable, of, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { User } from '@core/interfaces';
import { fadeInUp, listStagger } from '@core/animations';
import { Router } from '@angular/router';
import { SpinnerService } from '@common/spinner';
import { SnackbarService } from '@core/services/snackbar.service';
import { ConfirmService } from '@common/confirm';
import { CrudService } from '@core/services/crud.service';
import { API } from '@core/tokens';

@Component({
  templateUrl: './user.template.html',
  styleUrls: ['./user.style.scss'],
  animations: [listStagger, fadeInUp],
  providers: [CrudService, { provide: API, useExisting: UserApi }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  readonly users$: Observable<User[]> = this._crudService.list$('name');

  readonly trackByFn = (_: number, { id }: User): number => id;

  constructor(
    @Inject(Router) private readonly _router: Router,
    @Inject(CrudService) private readonly _crudService: CrudService<User>,
  ) {}

  onEdit(user: User): void {
    this._router.navigate([this._router.url, 'edit', user.id]);
  }

  onDelete(id: number): void {
    this._crudService.delete(id, () => this._crudService.search());
  }
}