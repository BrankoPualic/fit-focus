import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user_ls = localStorage.getItem('user');
  if (user_ls) return true;
  else {
    inject(Router).navigateByUrl('/authentication');
    return false;
  }
};
