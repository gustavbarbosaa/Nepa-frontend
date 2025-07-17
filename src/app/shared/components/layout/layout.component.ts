import { RouterOutlet } from '@angular/router';
import { Component, computed, inject } from '@angular/core';
import { TokenService } from '@core/services/token/token.service';
import { DrawerComponent } from '@shared/components/drawer/drawer.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, DrawerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  private readonly tokenService = inject(TokenService);
  readonly userAuthenticated = computed(() => {
    return (
      !!this.tokenService.getAccessToken() &&
      this.tokenService.isAccessTokenValid()
    );
  });
}
