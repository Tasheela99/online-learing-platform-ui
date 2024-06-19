import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {DatePipe, NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {EnrollmentService} from "../../../../services/enrollment.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ViewCourseEnrolmentComponent} from "../home/inner-items/view-course-enrolment/view-course-enrolment.component";
import {SnackbarService} from "../../../../services/snackbar.service";
import {ConfirmationDialogComponent} from "../../../../components/confirmation-dialog/confirmation-dialog.component";

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

  constructor(private enrollmentService: EnrollmentService,private snackBarService:SnackbarService) {
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
        this.courseEnrollmentsList = [];
      });
    }
  }

  toggleEnrollmentState(_id: string, checked: boolean) {
    this.enrollmentService.changeEnrollmentState(_id, checked).subscribe(
      (data: any) => {
        this.snackBarService.snackBar("Enrollment Status Updated Successfully", "close", 5000, 'ltr', 'center', 'bottom');
        const enrollmentToUpdate = this.courseEnrollmentsList.find(enrollment => enrollment._id === _id);
        if (enrollmentToUpdate) {
          enrollmentToUpdate.enrolledState = checked;
        }
      },
      error => {
        this.snackBarService.snackBar("Error Updating Enrollment Status", "close", 5000, 'ltr', 'center', 'bottom');
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete ?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) { // User confirmed deletion
        this.enrollmentService.delete(id).subscribe(response => {
          this.snackBarService.snackBar("Enrollment Deleted Successfully", "close", 5000, 'ltr', 'center', 'bottom');
          if (response && response.status === true) {
            this.loadCourses();
          }
        });
      }
    });
  }
}
