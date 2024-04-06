import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const signinGuard: CanActivateFn = (route, state) => {
  const user_ls = localStorage.getItem('user');
  if (!user_ls) return true;
  else {
    inject(Router).navigateByUrl('/profile');
    return false;
  }
};
