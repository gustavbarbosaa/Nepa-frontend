import { Component } from '@angular/core';

@Component({
  selector: 'app-background-auth',
  imports: [],
  template: `
    <div
      class="flex items-center justify-center flex-1 h-full bg-[url('/assets/background-auth.png')] bg-cover bg-center rounded-xl">
      <img src="/assets/logo-catolica.png" alt="Logo catolica" />
    </div>
  `,
})
export class BackgroundAuthComponent {}
