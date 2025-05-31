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
} from '@ng-icons/heroicons/outline';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-form',
  imports: [NgIcon, ReactiveFormsModule, CommonModule],
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
    }),
  ],
})
export class InputFormComponent implements OnInit {
  id = input.required<string>();
  label = input.required<string>();
  type = input.required<string>();
  initialIcon = input<string>();
  finalIcon = input<string>('heroEye');
  isPassword = input<boolean>(false);
  control = input.required<FormControl>();

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
}
