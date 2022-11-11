import { Directive, InjectionToken, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export const CARD_TITLE = new InjectionToken<TemplateRef<NgTemplateOutlet>>('cardTitle');

@Directive({
  standalone: true,
  selector: '[cardTitle]',
  providers: [
    {
      provide: CARD_TITLE,
      deps: [TemplateRef],
      useFactory: (templateRef: TemplateRef<NgTemplateOutlet>) => templateRef,
    }
  ],
})
export class CardTitle {}