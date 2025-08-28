import { Component, inject, signal } from '@angular/core';
import { TokenService } from '@core/services/token/token.service';
import { CardDetailsHomeComponent } from '@features/home/components/card-details-home/card-details-home.component';
import { CardTitleHomeComponent } from '../../components/card-title-home/card-title-home.component';
import { CardFastActionComponent } from '@features/home/components/card-fast-action/card-fast-action.component';
import { HomeLayoutComponent } from '@features/home/components/home-layout/home-layout.component';

@Component({
  selector: 'app-home-page',
  imports: [
    CardDetailsHomeComponent,
    CardTitleHomeComponent,
    CardFastActionComponent,
    HomeLayoutComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  private tokenService = inject(TokenService);

  user = signal(this.tokenService.getNameAndTypeUserForToken());
}
