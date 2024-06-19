import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {PlaygroundService} from "../../../../services/playground.service";
import {Router} from "@angular/router";
import {EnrollmentService} from "../../../../services/enrollment.service";
import {CookiesService} from "../../../../services/cookies.service";

@Component({
  selector: 'app-all-courses',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle,
        NgForOf
    ],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent implements OnInit{

  courseList: Array<any> = [];

  constructor(
    private playgroundService: PlaygroundService,
    private router: Router,
    private enrollmentService: EnrollmentService,
    private cookiesService: CookiesService
  ) {
  }

  ngOnInit() {
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.playgroundService.findAll().subscribe(response => {
      this.courseList = response.data.map((course: any) => ({
        ...course,
        enrolled: false
      }));
    });
  }

  enrollForCourse(course: any) {
    if (!this.cookiesService.getToken('token')) {
      this.router.navigateByUrl('/security/login');
      return;
    }

    this.enrollmentService.enrollUserInCourse(course._id).subscribe(
      response => {
        const index = this.courseList.findIndex(c => c._id === course._id);
        if (index !== -1) {
          this.courseList[index].enrolled = true;
        }
        alert('User enrolled in the course successfully');
      },
      error => {
        console.error('Enrollment error:', error);
        alert('An error occurred during enrollment');
      }
    );
  }

}
