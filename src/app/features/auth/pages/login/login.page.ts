import { Component } from '@angular/core';
import { TextHeaderComponent } from '../../components/text-header/text-header.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
import { BackgroundAuthComponent } from '../../components/background-auth/background-auth.component';
@Component({
  selector: 'app-login-page',
  imports: [
    TextHeaderComponent,
    LoginFormComponent,
    LogoComponent,
    BackgroundAuthComponent,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {}
