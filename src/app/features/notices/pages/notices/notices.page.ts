import { Component } from '@angular/core';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';
import { HeaderNoticesComponent } from '@features/notices/components/header-notices/header-notices.component';
import { TableNoticesComponent } from '@features/notices/components/table-notices/table-notices.component';

@Component({
  selector: 'app-notices',
  imports: [
    PagesLayoutComponent,
    HeaderNoticesComponent,
    TableNoticesComponent,
  ],
  templateUrl: './notices.page.html',
  styleUrl: './notices.page.css',
})
export class NoticesPage {}
