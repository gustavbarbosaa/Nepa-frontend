import { Component } from '@angular/core';
import { TableSubscriptionsComponent } from '@features/subscriptions/components/table-subscriptions/table-subscriptions.component';

@Component({
  selector: 'app-subscriptions',
  imports: [TableSubscriptionsComponent],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css',
})
export class SubscriptionsComponent {}
