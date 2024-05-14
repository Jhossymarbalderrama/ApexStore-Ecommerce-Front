import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanMatchFn = (route, state) => {
  const usrLogin = inject(LoginService);
  const router = inject(Router);
  const isLogin = usrLogin._svCurrentUserLoginOn.value;
  
  if(!isLogin){
    router.navigate(['home']);
    return false;
  }

  return true;
};
