import { DrawerComponent } from '@shared/components/drawer/drawer.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterPage } from '@features/auth/pages/register/register.page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterPage, DrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend_nepa';
}
