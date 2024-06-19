import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserEnrolledCoursesComponent} from "./components/user-enrolled-courses/user-enrolled-courses.component";
import {AllCoursesComponent} from "./components/all-courses/all-courses.component";

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    children: [
      {path: '', redirectTo: 'all-courses', pathMatch: 'full'},
      {path: 'my-courses', component: UserEnrolledCoursesComponent},
      {path: 'all-courses', component: AllCoursesComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
