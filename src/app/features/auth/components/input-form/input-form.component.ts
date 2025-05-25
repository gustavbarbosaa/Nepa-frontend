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
} from '@ng-icons/heroicons/outline';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  imports: [NgIcon, FormsModule],
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
    }),
  ],
})
export class InputFormComponent implements OnInit {
  id = input.required<string>();
  label = input.required<string>();
  type = input.required<string>();
  initialIcon = input.required<string>();
  finalIcon = input<string>('heroEye');
  isPassword = input<boolean>(false);

  typeInput = signal<string>('');
  finalIconInput = signal<string>('');

  ngOnInit(): void {
    this.typeInput.set(this.type());
    this.finalIconInput.set(this.finalIcon()!);
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
