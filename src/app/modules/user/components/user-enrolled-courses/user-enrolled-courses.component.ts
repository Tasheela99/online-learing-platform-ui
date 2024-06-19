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
import {EnrollmentService} from "../../../../services/enrollment.service";

@Component({
  selector: 'app-user-enrolled-courses',
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
  templateUrl: './user-enrolled-courses.component.html',
  styleUrl: './user-enrolled-courses.component.scss'
})
export class UserEnrolledCoursesComponent implements OnInit{
  courseList: Array<any> = [];

  constructor(private enrollmentService:EnrollmentService) {
  }

  ngOnInit() {
    this.enrollmentService.getAllEnrolledUserCourses().subscribe(
      (data: any) => {
        console.log(data)
        console.log(data.data)
        this.courseList = data.data;
      },
      error => {
        console.error('Error fetching course enrollments', error);
      }
    );
  }



}
