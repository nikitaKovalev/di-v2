import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef, EventEmitter,
  inject, Input, Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CARD_IMPORTS } from '@common/card/card.imports';
import { CARD_TITLE } from '@common/card/card-title.directive';
import { stringHashToHsl } from '@common/card/card-color';

@Component({
  standalone: true,
  imports: CARD_IMPORTS,
  selector: 'app-card',
  templateUrl: 'card.template.html',
  styleUrls: ['./card.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements AfterViewInit {
  @Input()
  png = '';

  @Output()
  readonly edit = new EventEmitter<void>();

  @ContentChild(CARD_TITLE)
  readonly title?: TemplateRef<NgTemplateOutlet>;

  @ViewChild('titleRef')
  readonly titleRef?: ElementRef;

  get bgColor(): string {
    return this._bgColor;
  }

  set bgColor(color: string) {
    this._bgColor = color;
  }

  private _bgColor = '';

  private readonly _cdRef = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this._applyColor();
  }

  get imagePath(): string {
    return `url('assets/${this.png}')`;
  }

  hasTitle(ref?: ElementRef): ref is ElementRef {
    const text = ref?.nativeElement!.innerText;

    return text && text.length > 0;
  }

  onEdit(): void {
    this.edit.emit();
  }

  private _applyColor(): void {
    if (this.hasTitle(this.titleRef)) {
      const words = this.titleRef.nativeElement.innerText;

      this.bgColor = stringHashToHsl(words);
      this._cdRef.detectChanges();
    } else {
      this.bgColor = '';
    }
  }
}