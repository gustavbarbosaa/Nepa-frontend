import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css',
})
export class TextAreaComponent {
  id = input.required<string>();
  label = input.required<string>();
  control = input.required<FormControl>();
  placeholder = input.required<string>();

  rows = input<number>(3);
  autoResize = input<boolean>(true);
  maxLength = input<number | null>(null);
  showCharacterCount = input<boolean>(false);

  characterCount = computed(() => {
    return this.control().value?.length || 0;
  });

  getErrorMessage(): string {
    const errors = this.control().errors;

    if (!errors) return '';

    if (errors['required']) {
      return 'Este campo é obrigatório';
    }

    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `Mínimo de ${requiredLength} caracteres`;
    }

    if (errors['maxlength']) {
      const maxLength = errors['maxlength'].requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }

    return 'Campo inválido';
  }
}
