import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {LoadingService} from "../services/loading.service";
import {catchError, finalize, throwError} from "rxjs";

export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(LoadingService);

  loadingService.loading.next(true);
  return next(req).pipe(
    catchError(err => {
      console.error(err);
      return throwError(() => err);
    }),
    finalize(() => {
      loadingService.loading.next(false);
    })
  );
};
