import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CardComponent } from '@common/card/card.component';
import { CardTitle } from '@common/card/card-title.directive';
import { UserEditComponent } from './edit/user-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserFormComponent } from './form/user-form.component';
import { UserCreateComponent } from './create/user-create.component';


@NgModule({
  declarations: [UserComponent, UserEditComponent, UserFormComponent, UserCreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,

    CardTitle,
    CardComponent,

    UserRoutingModule,
  ],
})
export class UserModule {}
