import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {DatePipe, NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AdminService} from "../../../../services/admin.service";
import {ViewCourseComponent} from "../home/inner-items/view-course/view-course.component";
import {EditCourseComponent} from "../home/inner-items/edit-course/edit-course.component";
import {EnrollmentService} from "../../../../services/enrollment.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ViewCourseEnrolmentComponent} from "../home/inner-items/view-course-enrolment/view-course-enrolment.component";

@Component({
  selector: 'app-course-enrolment-management',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    NgForOf,
    ReactiveFormsModule,
    DatePipe,
    MatSlideToggle
  ],
  templateUrl: './course-enrolment-management.component.html',
  styleUrl: './course-enrolment-management.component.scss'
})
export class CourseEnrolmentManagementComponent implements OnInit {

  courseEnrollmentsList: Array<any> = [];
  searchId = '';
  readonly dialog = inject(MatDialog);

  constructor(private enrollmentService: EnrollmentService) {
  }

  ngOnInit() {
    this.loadAllCourseEnrollments();
  }

  loadAllCourseEnrollments() {
    this.enrollmentService.getAllEnrollments().subscribe(
      (data: any) => {
        this.courseEnrollmentsList = data.data;
      },
      error => {
        console.error(error);
      }
    );
  }

  loadCourses() {
    if (this.searchId.trim() === '') {

    } else {
      this.enrollmentService.getAllEnrollments().subscribe(response => {
        if (response && response.data) {
          this.courseEnrollmentsList = [response.data];
        } else {
          this.courseEnrollmentsList = [];
        }
      }, error => {
        console.error('Error loading course:', error);
        this.courseEnrollmentsList = [];
      });
    }
  }

  toggleEnrollmentState(_id: string, checked: boolean) {
    this.enrollmentService.changeEnrollmentState(_id, checked).subscribe(
      (data: any) => {
        console.log('Enrollment state updated successfully:', data.message);
        const enrollmentToUpdate = this.courseEnrollmentsList.find(enrollment => enrollment._id === _id);
        if (enrollmentToUpdate) {
          enrollmentToUpdate.enrolledState = checked;
        }
      },
      error => {
        console.error('Error updating enrollment state:', error);
      }
    );
  }

  viewCourseEnrollment(enrolment:any) {
    console.log(enrolment)
    this.dialog.open(ViewCourseEnrolmentComponent, {
      width: '400px',
      data: enrolment
    });
  }

  deleteCourseEnrollment(id:any) {
    if (confirm('Are you sure you want to delete course: ' + id + '?')) {
      this.enrollmentService.delete(id).subscribe(response => {
        if (response && response.status === true) {
          this.loadCourses();
        }
      });
    }
  }
}
