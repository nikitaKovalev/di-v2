import { Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

export const TODO_IMPORT: Array<Type<any>> = [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, NgIf ];