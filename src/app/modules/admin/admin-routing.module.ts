import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CourseManagementComponent} from "./components/course-management/course-management.component";
import {
  CourseEnrolmentManagementComponent
} from "./components/course-enrolment-management/course-enrolment-management.component";
import {UserManagementComponent} from "./components/user-management/user-management.component";

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    children: [
      {path: '', redirectTo: 'courses', pathMatch: 'full'},
      {path: 'courses', component: CourseManagementComponent},
      {path: 'course-enrolments', component: CourseEnrolmentManagementComponent},
      {path: 'users', component: UserManagementComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
