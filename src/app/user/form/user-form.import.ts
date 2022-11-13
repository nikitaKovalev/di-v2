import { Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

export const USER_FORM_IMPORT: Array<Type<any>> = [
  ReactiveFormsModule,
  NgIf,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
];