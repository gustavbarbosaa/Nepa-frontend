import { Component, input, OnInit, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroAcademicCap,
  heroEye,
  heroEyeSlash,
  heroLockClosed,
  heroDevicePhoneMobile,
  heroUser,
  heroAtSymbol,
  heroIdentification,
  heroDocumentText,
  heroMapPin,
  heroUserGroup,
  heroMagnifyingGlass,
  heroCalendarDateRange,
  heroClock,
} from '@ng-icons/heroicons/outline';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input-form',
  imports: [NgIcon, ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css',
  viewProviders: [
    provideIcons({
      heroAcademicCap,
      heroEye,
      heroEyeSlash,
      heroLockClosed,
      heroDevicePhoneMobile,
      heroUser,
      heroAtSymbol,
      heroIdentification,
      heroDocumentText,
      heroMapPin,
      heroUserGroup,
      heroMagnifyingGlass,
      heroCalendarDateRange,
      heroClock,
    }),
  ],
  providers: [],
})
export class InputFormComponent implements OnInit {
  id = input.required<string>();
  label = input.required<string>();
  type = input.required<string>();
  initialIcon = input<string>();
  finalIcon = input<string>('heroEye');
  isPassword = input<boolean>(false);
  control = input.required<FormControl>();
  placeholder = input.required<string>();

  typeInput = signal<string>('');
  finalIconInput = signal<string>('');

  ngOnInit(): void {
    this.typeInput.set(this.type());
    this.finalIconInput.set(this.finalIcon()!);
  }

  get formControl(): FormControl {
    return this.control();
  }

  togglePassword(): void {
    if (this.isPassword()) {
      const newTypeInput =
        this.typeInput() === 'password' ? 'text' : 'password';

      this.typeInput.set(newTypeInput);

      this.finalIconInput.set(
        newTypeInput === 'password' ? 'heroEye' : 'heroEyeSlash'
      );
    }
  }

  getErrorMessage(): string {
    const errors = this.formControl.errors;

    if (!errors) return '';

    if (errors['required']) {
      return 'Este campo é obrigatório';
    }

    if (errors['email']) {
      return 'E-mail inválido';
    }

    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `Mínimo de ${requiredLength} caracteres`;
    }

    if (errors['maxlength']) {
      const maxLength = errors['maxlength'].requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }

    if (errors['pattern']) {
      return 'A senha deve conter pelo menos 8 caracteres, com letras e números';
    }

    return 'Campo inválido';
  }
}
