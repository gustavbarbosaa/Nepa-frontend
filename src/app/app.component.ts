import { Component } from '@angular/core';
import { LayoutComponent } from '@shared/components/layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend_nepa';
}
