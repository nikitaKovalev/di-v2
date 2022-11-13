import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CardComponent } from '@common/card/card.component';
import { CardTitle } from '@common/card/card-title.directive';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CardTitle,
    CardComponent,

    UserRoutingModule,
  ],
})
export class UserModule {}
