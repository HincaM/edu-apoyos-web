import { Component, input, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

export interface EduSelectOption<T> {
  value: T;
  label: string;
}

@Component({
  selector: 'edu-select',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './edu-select.html',
  styleUrl: './edu-select.scss',
})
export class EduSelect<T> {
  readonly label = input('');
  readonly options = input.required<EduSelectOption<T>[]>();
  readonly value = input<T | null>(null);
  readonly placeholder = input('Todos');
  readonly valueChange = output<T | null>();
}
