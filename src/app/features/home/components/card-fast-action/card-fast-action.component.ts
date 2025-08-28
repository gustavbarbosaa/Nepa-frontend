import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-fast-action',
  imports: [CardModule, NgClass],
  templateUrl: './card-fast-action.component.html',
  styleUrl: './card-fast-action.component.css',
})
export class CardFastActionComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
  icon = input.required<string>();
  color = input.required<string>();
}
