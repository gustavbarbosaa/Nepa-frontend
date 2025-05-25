import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  template: `
    <button
      [type]="type()"
      [ngClass]="color()"
      class="flex items-center justify-center rounded-md drop-shadow-md py-2 w-full font-inter font-bold text-base inset-shadow-light hover:scale-105 transition-all duration-300 cursor-pointer">
      {{ text() }}
    </button>
  `,
})
export class ButtonComponent {
  text = input.required<string>();
  type = input<string>('button');
  color = input<string>('bg-primary-900');
}
