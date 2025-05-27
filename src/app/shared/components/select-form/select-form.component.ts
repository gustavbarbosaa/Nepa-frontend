import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
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

@Component({
  selector: 'app-select-form',
  imports: [NgIcon],
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
    }),
  ],
})
export class SelectFormComponent {
  id = input.required<string>();
  label = input.required<string>();
  initialIcon = input<string>();
  control = input<FormControl>();
  options = input<{ label: string; value: string }[]>([]);
}
