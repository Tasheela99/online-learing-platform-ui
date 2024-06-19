import {Routes} from '@angular/router';
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {path: '', redirectTo: 'playground', pathMatch: 'full'},
  {path: 'security', loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule)},
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard]
  },
  {path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [authGuard]},
  {
    path: 'playground',
    loadChildren: () => import('./modules/playground/playground.module').then(m => m.PlaygroundModule)
  },
];
