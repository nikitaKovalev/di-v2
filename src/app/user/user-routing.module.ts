import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { API } from '@core/tokens';
import { UserApi } from '@core/api';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'create',
    title: 'User create',
    loadComponent: () => import('./create/user-create.component').then(c => c.UserCreateComponent),
  },
  {
    path: 'edit/:id',
    title: 'User details',
    providers: [{ provide: API, useExisting: UserApi }],
    loadComponent: () => import('./edit/user-edit.component').then(c => c.UserEditComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
