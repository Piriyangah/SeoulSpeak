import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { BackendService } from './backend.service';

export const authguardLogin: CanActivateFn = (route, state) => {
  return inject(BackendService).loggedIn() ? true : inject(Router).navigate(['/login']);
};

export const authguardAdmin: CanActivateFn = (route, state) => {
  return inject(BackendService).isAdmin() ? true : inject(Router).navigate(['/login']);
};