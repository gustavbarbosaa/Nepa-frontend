import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateEqualPasswords(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('senha');
  const confirmPassword = control.get('confirmar_senha');

  if (!password || !confirmPassword) return null;

  if (password.value !== confirmPassword.value)
    return { passwordsNotEqual: true };

  return null;
}
