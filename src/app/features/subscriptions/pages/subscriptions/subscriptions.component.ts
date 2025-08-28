import { Component } from '@angular/core';
import { TableSubscriptionsComponent } from '@features/subscriptions/components/table-subscriptions/table-subscriptions.component';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';
import { HeaderSubscriptionsComponent } from '@features/subscriptions/components/header-subscriptions/header-subscriptions.component';

@Component({
  selector: 'app-subscriptions',
  imports: [
    TableSubscriptionsComponent,
    PagesLayoutComponent,
    HeaderSubscriptionsComponent,
  ],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css',
})
export class SubscriptionsComponent {}
