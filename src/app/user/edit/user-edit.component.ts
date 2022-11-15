import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { UserApi } from '@core/api/user.api';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { User } from '@core/interfaces';
import { fadeInUp } from '@core/animations';
import { AsyncPipe, Location } from '@angular/common';
import { UserFormComponent } from '../form/user-form.component';
import { SpinnerService } from '@common/spinner';
import { SnackbarService } from '@core/services/snackbar.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [UserFormComponent, AsyncPipe],
  template: `
    <app-user-form
      @fadeInUp 
      canDelete="true"
      [user]="(user$ | async)!"
      (submit)="onEditUser($event)"
      (delete)="onDeleteUser($event)"
    ></app-user-form>
  `,
  animations: [fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent implements OnDestroy {
  readonly user$: Observable<User> = this._activatedRoute.paramMap.pipe(
    map((params: ParamMap) => params.get('id')),
    filter(Boolean),
    switchMap((id: string) => this._userApi.findOne(id)),
  );

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    @Inject(ActivatedRoute) private readonly _activatedRoute: ActivatedRoute,
    @Inject(UserApi) private readonly _userApi: UserApi,
    @Inject(Location) private readonly _location: Location,
    @Inject(SpinnerService) private readonly _spinner: SpinnerService,
    @Inject(SnackbarService) private readonly _snackbar: SnackbarService,
  ) {}

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  onEditUser(user: User): void {
    this._spinner.open();
    this._userApi.update<User>(user.id, user)
      .pipe(
        finalize(() => this._spinner.close()),
        takeUntil(this._destroyed$)
      )
      .subscribe({
        next: () => {
          this._snackbar.open('User updated', 'success');
          this._location.back();
        },
        error: () => this._snackbar.open('User update failed', 'error'),
      });
  }

  onDeleteUser(user: User): void {
    this._spinner.open();
    this._userApi.delete(user.id)
      .pipe(
        finalize(() => this._spinner.close()),
        takeUntil(this._destroyed$),
      )
      .subscribe({
        next: () => {
          this._snackbar.open('User deleted', 'success');
          this._location.back();
        },
        error: () => this._snackbar.open('User deletion failed', 'error'),
      });
  }
}
