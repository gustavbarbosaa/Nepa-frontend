import { Component } from '@angular/core';
import { TextHeaderComponent } from '../../components/text-header/text-header.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  imports: [TextHeaderComponent, LoginFormComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {}
