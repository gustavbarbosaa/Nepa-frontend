import { Component, input } from '@angular/core';

@Component({
  selector: 'app-text-header',
  imports: [],
  template: `
    <div class="text-header">
      <h2 class="text-header__title">
        {{ title() }}
      </h2>
      <p class="text-header__description">
        {{ description() }}
      </p>
    </div>
  `,
  styleUrl: './text-header.component.css',
})
export class TextHeaderComponent {
  title = input.required<string>();
  description = input.required<string>();
}
