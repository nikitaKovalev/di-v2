import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CardComponent } from '@common/card/card.component';
import { CardTitle } from '@common/card/card-title.directive';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [UserComponent, UserDetailsComponent],
  imports: [ CommonModule, UserRoutingModule, CardComponent, CardTitle, CardTitle, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule ]
})
export class UserModule { }
