import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isValid = await authService.validateToken()

  if( !isValid ) {
    router.navigateByUrl("login");
  }

  return isValid;
};
