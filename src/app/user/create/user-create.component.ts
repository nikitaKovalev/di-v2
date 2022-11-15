import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { fadeInUp } from '@core/animations';
import { User } from '@core/interfaces';
import { UserApi } from '@core/api/user.api';
import { Location } from '@angular/common';
import { UserFormComponent } from '../form/user-form.component';
import { SpinnerService } from '@common/spinner';
import { finalize, Subject, takeUntil } from 'rxjs';
import { SnackbarService } from '@core/services/snackbar.service';

@Component({
  standalone: true,
  imports: [UserFormComponent],
  selector: 'app-user-create',
  template: `
    <app-user-form 
      @fadeInUp 
      (submit)="onCreateUser($event)"
    ></app-user-form>
  `,
  animations: [fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent implements OnDestroy {
  private readonly _destroyed$ = new Subject<void>();

  constructor(
    @Inject(UserApi) private readonly _userApi: UserApi,
    @Inject(Location) private readonly _location: Location,
    @Inject(SpinnerService) private readonly _spinner: SpinnerService,
    @Inject(SnackbarService) private readonly _snackbar: SnackbarService,
  ) {}

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  onCreateUser(user: User): void {
    this._spinner.open();
    this._userApi.create(user)
      .pipe(
        finalize(() => this._spinner.close()),
        takeUntil(this._destroyed$)
      )
      .subscribe({
        next: () => {
          this._snackbar.open('User created', 'success');
          this._location.back();
        },
        error: () => this._snackbar.open('User creation failed', 'error'),
      });
  }
}