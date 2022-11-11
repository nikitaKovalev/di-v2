import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserApi } from '@core/api/user.api';
import { Observable } from 'rxjs';
import { User } from '@core/interfaces';
import { fadeInUp, listStagger } from '@core/animations';
import { shareReplay } from 'rxjs/operators';

@Component({
  template: `
    <div [@listStagger]="(users$ | async)?.length">
      <app-card
        *ngFor="let user of users$ | async"
        @fadeInUp
        png="avatar.png"
      >
        <ng-template cardTitle>{{ user?.name || '' }}</ng-template>
        <ng-container ngProjectAs="subtitle">{{ user?.website || '' }}</ng-container>
        <ng-container
          *ngIf="user?.username"
          ngProjectAs="content"
        >
          You can search by: <b>{{ user!.username }}</b>
        </ng-container>
      </app-card>
    </div>
  `,
  styleUrls: ['./user.style.scss'],
  animations: [listStagger, fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  readonly users$: Observable<User[]> = inject(UserApi).search().pipe(
    shareReplay(1),
  );
}