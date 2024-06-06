import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from '../../types/user';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');
  let currentData: any = localStorage.getItem('currentUser');
  currentData = JSON.parse(currentData);
  if (!token || currentData.role !== 'admin') {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
