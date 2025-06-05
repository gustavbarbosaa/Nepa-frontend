import { Component, inject, input } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftOnRectangle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-button-logout',
  imports: [NgIcon],
  templateUrl: './button-logout.component.html',
  styleUrls: ['./button-logout.component.css'],
  providers: [
    provideIcons({
      heroArrowLeftOnRectangle,
    }),
  ],
})
export class ButtonLogoutComponent {
  private readonly authService = inject(AuthService);

  label = input<string>('Sair');
  icon = input<string>('heroArrowLeftOnRectangle');
  textVisible = input<boolean>(true);

  logout(): void {
    this.authService.logout();
  }
}
