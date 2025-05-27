import { Component } from '@angular/core';
import { TextHeaderComponent } from '@features/auth/components/text-header/text-header.component';
import { RegisterFormComponent } from '@features/auth/components/register-form/register-form.component';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { BackgroundAuthComponent } from '@features/auth/components/background-auth/background-auth.component';

@Component({
  selector: 'app-register-page',
  imports: [
    TextHeaderComponent,
    RegisterFormComponent,
    LogoComponent,
    BackgroundAuthComponent,
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
})
export class RegisterPage {}
