import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-title-home',
  imports: [CardModule],
  templateUrl: './card-title-home.component.html',
  styleUrl: './card-title-home.component.css',
})
export class CardTitleHomeComponent {
  role = input.required<string>();
}
