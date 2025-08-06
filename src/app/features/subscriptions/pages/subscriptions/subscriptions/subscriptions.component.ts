import { Component } from '@angular/core';
import { TableSubscriptionsComponent } from '@features/subscriptions/components/table-subscriptions/table-subscriptions.component';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';

@Component({
  selector: 'app-subscriptions',
  imports: [TableSubscriptionsComponent, PagesLayoutComponent],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css',
})
export class SubscriptionsComponent {}
