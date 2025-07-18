import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title-header-list',
  imports: [],
  templateUrl: './title-header-list.component.html',
  styleUrl: './title-header-list.component.css',
})
export class TitleHeaderListComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
}
