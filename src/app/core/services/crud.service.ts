import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BaseCrudApi } from '@core/api';
import { Location } from '@angular/common';
import { SpinnerService } from '@common/spinner';
import { SnackbarService } from '@core/services/snackbar.service';
import { finalize, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ConfirmService } from '@common/confirm';
import { API } from '@core/tokens';
import { Messages, MESSAGES } from '@core/tokens/messages.token';
import { SEARCH_CONTROL } from '@core/tokens/search-control.token';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CrudService<T> implements OnDestroy {
  private readonly _destroyed$ = new Subject<void>();

  constructor(
    @Inject(ActivatedRoute) private readonly _activatedRoute: ActivatedRoute,
    @Inject(Location) private readonly _location: Location,
    @Inject(SpinnerService) private readonly _spinner: SpinnerService,
    @Inject(SnackbarService) private readonly _snackbar: SnackbarService,
    @Inject(ConfirmService) private readonly _confirm: ConfirmService,

    @Inject(API) private readonly _api: BaseCrudApi<T>,
    @Inject(MESSAGES) private readonly _messages: Messages,
    @Inject(SEARCH_CONTROL) private readonly _control: FormControl<string | null>,
  ) {}

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  get item$(): Observable<T> {
    return this._activatedRoute.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      filter(Boolean),
      switchMap((id: string) => this._api.findOne(id)),
    );
  }

  list$(key: keyof T): Observable<T[]> {
    return this._control.valueChanges.pipe(
      startWith(''),
      switchMap((search: string | null) => this._api.search(search || '', key)),
    );
  }

  search(): void {
    this._control.patchValue('');
  }

  create(item: T, callback?: () => void): void {
    this._spinner.open();
    this._api.create(item)
      .pipe(
        finalize(() => this._spinner.close()),
        takeUntil(this._destroyed$)
      )
      .subscribe({
        next: () => {
          this._snackbar.open(this._messages.successCreate, 'success');

          if (callback) {
            callback();
          } else {
            this._location.back();

          }
        },
        error: () => this._snackbar.open(this._messages.errorCreate, 'error'),
      });
  }

  update(id: string | number, item: T): void {
    this._spinner.open();
    this._api.update(id, item)
      .pipe(
        finalize(() => this._spinner.close()),
        takeUntil(this._destroyed$)
      )
      .subscribe({
        next: () => {
          this._snackbar.open(this._messages.successEdit, 'success');
          this._location.back();
        },
        error: () => this._snackbar.open(this._messages.errorEdit, 'error'),
      });
  }

  delete(id: string | number, callback?: () => void): void {
    this._confirm.delete(this._messages.confirmDelete, this._messages.delete)
      .pipe(
        tap(() => this._spinner.open()),
        switchMap(() => this._api.delete(id)),
        finalize(() => this._spinner.close()),
        takeUntil(this._destroyed$)
      )
      .subscribe({
        next: () => {
          this._snackbar.open(this._messages.successDelete, 'success');

          if (callback) {
            callback();
          } else {
            this._location.back();
          }

        },
        error: () => this._snackbar.open(this._messages.errorDelete, 'error'),
      });
  }
}
