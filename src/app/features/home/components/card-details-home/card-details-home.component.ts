import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-details-home',
  imports: [CardModule],
  templateUrl: './card-details-home.component.html',
  styleUrl: './card-details-home.component.css',
})
export class CardDetailsHomeComponent {
  title = input.required<string>();
  number = input.required<number>();
}
