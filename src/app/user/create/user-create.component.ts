import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {fadeInUp} from '@core/animations';
import {User} from '@core/interfaces';
import {UserFormComponent} from '../form/user-form.component';
import {CrudService} from '@core/services/crud.service';

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
  providers: [CrudService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent {
  constructor(
    @Inject(CrudService) private readonly _crudService: CrudService<User>,
  ) {}

  onCreateUser(user: User): void {
    this._crudService.create(user);
  }
}
