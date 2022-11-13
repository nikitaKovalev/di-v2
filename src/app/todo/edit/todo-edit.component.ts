import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoFormComponent } from '../form/todo-form.component';
import { Todo } from '@core/interfaces';
import { fadeInUp } from '@core/animations';

@Component({
  standalone: true,
  imports: [TodoFormComponent],
  template: `
    <app-todo-form 
      @fadeInUp
      canDelete="true"
      (submit)="onEditTodo($event)"
      (delete)="onDeleteTodo($event)"
    ></app-todo-form>
  `,
  animations: [fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoEditComponent {
  onEditTodo(todo: Todo): void {
    //
  }

  onDeleteTodo(todo: Todo): void {
    //
  }
}