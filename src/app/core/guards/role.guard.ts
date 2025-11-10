import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService, UserRole } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const roles = (route.data?.['roles'] as UserRole[]) || [];
  if (roles.length === 0 || auth.hasRole(roles)) return true;
  return router.createUrlTree(['/dashboard']);
};
