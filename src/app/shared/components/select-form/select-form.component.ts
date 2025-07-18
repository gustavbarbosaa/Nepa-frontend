import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroAcademicCap,
  heroEye,
  heroEyeSlash,
  heroLockClosed,
  heroDevicePhoneMobile,
  heroUser,
  heroAtSymbol,
  heroArrowPathRoundedSquare,
  heroAdjustmentsHorizontal,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-select-form',
  imports: [NgIcon, ReactiveFormsModule, CommonModule],
  templateUrl: './select-form.component.html',
  styleUrl: './select-form.component.css',
  viewProviders: [
    provideIcons({
      heroAcademicCap,
      heroEye,
      heroEyeSlash,
      heroLockClosed,
      heroDevicePhoneMobile,
      heroUser,
      heroAtSymbol,
      heroArrowPathRoundedSquare,
      heroAdjustmentsHorizontal,
    }),
  ],
})
export class SelectFormComponent {
  id = input.required<string>();
  label = input.required<string>();
  initialIcon = input<string>();
  control = input.required<FormControl>();
  options = input<{ label: string; value: string }[]>([]);

  get formControl(): FormControl {
    return this.control();
  }

  getSelectErrorMessage(): string {
    const errors = this.formControl.errors;

    if (!errors) return '';

    if (errors['required']) {
      return 'Seleção obrigatória';
    }

    return 'Campo inválido';
  }
}
