import { Component } from '@angular/core';

@Component({
  selector: 'app-pages-layout',
  imports: [],
  template: ` <div class="w-full h-full max-w-5xl mx-auto px-4 py-8">
    <ng-content></ng-content>
  </div>`,
})
export class PagesLayoutComponent {}
