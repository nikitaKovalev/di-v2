import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserApi } from '@core/api/user.api';
import { Observable } from 'rxjs';
import { User } from '@core/interfaces';
import { fadeInUp, listStagger } from '@core/animations';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  templateUrl: './user.template.html',
  styleUrls: ['./user.style.scss'],
  animations: [listStagger, fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  readonly users$: Observable<User[]> = inject(UserApi).search().pipe(
    shareReplay(1),
  );

  private readonly _router = inject(Router);

  onEdit(user: User): void {
    this._router.navigate(['user', user.id]);
  }
}