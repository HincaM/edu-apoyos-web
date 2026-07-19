import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import type { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'edu-flat-button',
  imports: [MatButtonModule],
  template: `
    <button mat-flat-button [color]="color()" [type]="type()" [disabled]="disabled()" (click)="clicked.emit()">
      <ng-content />
    </button>
  `,
  styleUrl: './edu-flat-button.scss',
})
export class EduFlatButton {
  readonly color = input<ThemePalette>('primary');
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);
  readonly clicked = output<void>();
}
