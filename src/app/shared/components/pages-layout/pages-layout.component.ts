import { Component } from '@angular/core';

@Component({
  selector: 'app-pages-layout',
  imports: [],
  template: ` <div
    class="w-full h-[90vh] max-w-5xl mx-auto px-4 py-8 my-8 rounded-2xl drop-shadow-lg bg-white overflow-scroll">
    <ng-content></ng-content>
  </div>`,
})
export class PagesLayoutComponent {}
