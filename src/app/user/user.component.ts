import { ChangeDetectionStrategy, Component, Inject, inject, OnDestroy } from '@angular/core';
import { UserApi } from '@core/api/user.api';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { User } from '@core/interfaces';
import { fadeInUp, listStagger } from '@core/animations';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SEARCH_CONTROL } from '@core/tokens';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './user.template.html',
  styleUrls: ['./user.style.scss'],
  animations: [listStagger, fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnDestroy {
  readonly users$: Observable<User[]> = inject(UserApi).search().pipe(
    shareReplay(1),
  );

  private readonly _router = inject(Router);
  private readonly _usersApi = inject(UserApi);

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    @Inject(SEARCH_CONTROL) private readonly _control: FormControl<string>,
  ) {
    this._control.valueChanges
      .pipe(
        switchMap((value: string) => this._usersApi.search(value, 'name')),
        takeUntil(this._destroyed$)
      )
      .subscribe(console.log)
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  onEdit(user: User): void {
    this._router.navigate(['user', user.id]);
  }
}