import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CookiesService} from "../services/cookies.service";

export const authGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookiesService);
  const router = inject(Router);

  if (cookieService.isExistsToken('token')) {
    return true;
  } else {
    router.navigateByUrl('/security/login');
    return false;
  }
};
