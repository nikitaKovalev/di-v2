import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoFormComponent } from '../form/todo-form.component';
import { Todo } from '@core/interfaces';
import { fadeInUp } from '@core/animations';

@Component({
  standalone: true,
  imports: [TodoFormComponent],
  template: `<app-todo-form @fadeInUp (submit)="onCreateTodo($event)"></app-todo-form>`,
  animations: [fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateComponent {
  onCreateTodo(todo: Todo): void {
    //
  }
}