import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { CardComponent } from '@common/card/card.component';
import { CardTitle } from '@common/card/card-title.directive';


@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,

    CardComponent,
    CardTitle,

    TodoRoutingModule,
  ]
})
export class TodoModule { }
