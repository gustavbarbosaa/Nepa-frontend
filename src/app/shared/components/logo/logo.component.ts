import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  template: `
    <div class="flex items-center gap-2">
      <img src="/assets/logo-nepa.png" alt="Logo do Nepa" />
      @if (reduce()) {
        <h2 class="font-poppins font-semibold text-base text-dark">Nepa</h2>
      }
    </div>
  `,
})
export class LogoComponent {
  reduce = input<boolean>();
}
