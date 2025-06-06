import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@core/services/token/token.service';

export const authGuard: CanActivateFn = state => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const accessToken = tokenService.getAccessToken();

  const isValid = accessToken && tokenService.isAccessTokenValid();

  if (!isValid) {
    router.navigate(['/autenticacao/entrar'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  return true;
};
