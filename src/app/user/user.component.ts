import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { UserApi } from '@core/api/user.api';
import { Observable, startWith, switchMap } from 'rxjs';
import { User } from '@core/interfaces';
import { fadeInUp, listStagger } from '@core/animations';
import { Router } from '@angular/router';
import { SEARCH_CONTROL } from '@core/tokens';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './user.template.html',
  styleUrls: ['./user.style.scss'],
  animations: [listStagger, fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  readonly users$: Observable<User[]> = this._control.valueChanges.pipe(
    startWith(''),
    switchMap((value: string) => this._usersApi.search(value, 'name')),
  );

  readonly trackByFn = (_: number, { id }: User): number => id;

  private readonly _router = inject(Router);
  private readonly _usersApi = inject(UserApi);

  constructor(
    @Inject(SEARCH_CONTROL) private readonly _control: FormControl<string>,
  ) {}

  onEdit(user: User): void {
    this._router.navigate([this._router.url, 'edit', user.id]);
  }

  onDelete(id: number): void {
    //
  }
}