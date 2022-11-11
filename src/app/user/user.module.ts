import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CardComponent } from '@common/card/card.component';
import { CardTitle } from '@common/card/card-title.directive';


@NgModule({
  declarations: [UserComponent],
  imports: [ CommonModule, UserRoutingModule, CardComponent, CardTitle, CardTitle ]
})
export class UserModule { }
