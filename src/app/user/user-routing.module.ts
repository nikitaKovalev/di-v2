import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserCreateComponent } from './create/user-create.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'create',
    title: 'User create',
    component: UserCreateComponent,
  },
  {
    path: ':id',
    title: 'User details',
    component: UserEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
