import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Type } from '@angular/core';

export const CARD_IMPORTS: Array<Type<any>> = [
  NgTemplateOutlet,
  MatCardModule,
  MatButtonModule,
  NgIf,
];