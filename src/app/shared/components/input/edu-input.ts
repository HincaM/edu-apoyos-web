import { Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'edu-input',
  imports: [FormField, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './edu-input.html',
  styleUrl: './edu-input.scss',
})
export class EduInput {
  readonly field = input.required<Field<string>>();
  readonly label = input('');
  readonly type = input<'text' | 'email' | 'password' | 'number'>('text');
  readonly icon = input<string | null>(null);
  readonly placeholder = input('');
  readonly hint = input<string | null>(null);
  readonly autocomplete = input('off');
}
