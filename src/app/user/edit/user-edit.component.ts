import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@core/interfaces';
import { fadeInUp } from '@core/animations';
import { AsyncPipe } from '@angular/common';
import { UserFormComponent } from '../form/user-form.component';
import { CrudService } from '@core/services/crud.service';

@Component({
  standalone: true,
  imports: [UserFormComponent, AsyncPipe],
  providers: [CrudService],
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
export class UserEditComponent {
  readonly user$: Observable<User> = this._crudService.item$;

  constructor(
    @Inject(CrudService) private readonly _crudService: CrudService<User>,
  ) {}

  onEditUser(user: User): void {
    this._crudService.update(user.id, user);
  }

  onDeleteUser({ id }: User): void {
    this._crudService.delete(id);
  }
}
