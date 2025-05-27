import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPage } from '@features/auth/pages/login/login.page';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { RegisterPage } from '@features/auth/pages/register/register.page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPage, RegisterPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend_nepa';
}
