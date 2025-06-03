import { Injectable, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

const LOCAL_STORAGE_ACCESS_TOKEN = 'access_token';
const LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly _accessToken: WritableSignal<string | null> = signal(
    localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
  );
  private readonly _refreshToken: WritableSignal<string | null> = signal(
    localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
  );

  public readonly accessToken$ = this._accessToken.asReadonly();
  public readonly refreshToken$ = this._refreshToken.asReadonly();

  getAccessToken(): string | null {
    return this._accessToken();
  }

  getRefreshToken(): string | null {
    return this._refreshToken();
  }

  setTokens(tokens: iToken): void {
    this._accessToken.set(tokens.access_token);
    this._refreshToken.set(tokens.refresh_token);
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, tokens.refresh_token);
  }

  clearTokens(): void {
    this._accessToken.set(null);
    this._refreshToken.set(null);
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
  }

  hasTokens(): boolean {
    return !!this._accessToken() && !!this._refreshToken();
  }

  isAccessTokenValid(): boolean {
    const accessToken = this.getAccessToken();

    if (!accessToken) return false;

    try {
      const decodedToken: { exp: number } = jwtDecode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);

      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Error decoding access token:', error);
      return false;
    }
  }
}
