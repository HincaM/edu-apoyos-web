import { Component, input, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'edu-numeric-input',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './edu-numeric-input.html',
  styleUrl: './edu-numeric-input.scss',
})
export class EduNumericInput {
  readonly label = input('');
  readonly placeholder = input('');
  readonly min = input<number | null>(null);
  readonly step = input<number | null>(null);
  readonly value = input('');
  readonly errorMessage = input<string | null>(null);
  readonly valueChange = output<string>();
}
