import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  template: `
    <button type="button" class="flex items-center gap-2">
      <img src="/assets/logo-nepa.png" alt="Logo do Nepa" />
      @if (!reduce()) {
        <h2
          class="font-poppins font-semibold text-base text-dark dark:text-light">
          Nepa
        </h2>
      }
    </button>
  `,
})
export class LogoComponent {
  reduce = input<boolean>();
}
