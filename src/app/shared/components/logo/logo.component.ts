import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [RouterLink],
  template: `
    <a routerLink="#" class="flex items-center gap-2">
      <img src="/assets/logo-nepa.png" alt="Logo do Nepa" />
      @if (!reduce()) {
        <h2
          class="font-poppins font-semibold text-base text-dark dark:text-light">
          Nepa
        </h2>
      }
    </a>
  `,
})
export class LogoComponent {
  reduce = input<boolean>();
}
