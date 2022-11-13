import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
  {
    path: 'create',
    title: 'Todo create',
    loadComponent: () => import('./create/todo-create.component').then(c => c.TodoCreateComponent),
  },
  {
    path: 'edit/:id',
    title: 'Todo details',
    loadComponent: () => import('./edit/todo-edit.component').then(c => c.TodoEditComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
