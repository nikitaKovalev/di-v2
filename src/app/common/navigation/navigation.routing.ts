import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    title: 'Users',
    loadChildren: () => import('../../user/user.module').then(m => m.UserModule),
  },
  {
    path: 'todo',
    title: 'Todos',
    loadChildren: () => import('../../todo/todo.module').then(m => m.TodoModule),
  },
  {
    path: 'post',
    title: 'Posts',
    loadChildren: () => import('../../post/post.module').then(m => m.PostModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigationRouting {}