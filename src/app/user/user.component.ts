import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { UserApi } from '@core/api/user.api';
import { finalize, Observable, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { User } from '@core/interfaces';
import { fadeInUp, listStagger } from '@core/animations';
import { Router } from '@angular/router';
import { SpinnerService } from '@common/spinner';
import { SnackbarService } from '@core/services/snackbar.service';
import { ConfirmService } from '@common/confirm';

@Component({
  templateUrl: './user.template.html',
  styleUrls: ['./user.style.scss'],
  animations: [listStagger, fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnDestroy {
  private readonly _search$ = new Subject<void>();

  readonly users$: Observable<User[]> = this._search$.asObservable().pipe(
    startWith(''),
    switchMap(() => this._userApi.search()),
  );

  readonly trackByFn = (_: number, { id }: User): number => id;

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    @Inject(Router) private readonly _router: Router,
    @Inject(UserApi) private readonly _userApi: UserApi,
    @Inject(SpinnerService) private readonly _spinner: SpinnerService,
    @Inject(SnackbarService) private readonly _snackbar: SnackbarService,
    @Inject(ConfirmService) private readonly _confirm: ConfirmService,
  ) {}

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  onEdit(user: User): void {
    this._router.navigate([this._router.url, 'edit', user.id]);
  }

  onDelete(id: number): void {
    this._confirm.delete('You are about to delete user', 'Are you sure you wish to proceed?')
      .pipe(
        tap(() => this._spinner.open()),
        switchMap(() => this._userApi.delete(id)),
        finalize(() => this._spinner.close()),
        takeUntil(this._destroyed$)
      )
      .subscribe({
        next: () => {
          this._snackbar.open('User deleted', 'success');
          this._search$.next();
        },
        error: () => {
          this._snackbar.open('User not deleted', 'error');
        }
      })
  }
}