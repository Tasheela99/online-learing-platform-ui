import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AdminService} from "../../../../services/admin.service";
import {ViewCourseComponent} from "../home/inner-items/view-course/view-course.component";
import {EditCourseComponent} from "../home/inner-items/edit-course/edit-course.component";
import {SnackbarService} from "../../../../services/snackbar.service";
import {ConfirmationDialogComponent} from "../../../../components/confirmation-dialog/confirmation-dialog.component";
import {MatDivider} from "@angular/material/divider";

import { ChangeDetectorRef} from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-course-management',
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
    NgIf,
    MatError,
    MatDivider
  ],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.scss',
  providers:[
    AdminService
  ]
})
export class CourseManagementComponent implements OnInit {

  date!: Date;
  courseList: Array<any> = [];
  searchId = '';

  constructor(private adminService: AdminService, private snackBarService: SnackbarService, private dialog: MatDialog , private cd: ChangeDetectorRef ) {


  }

  courseForm = new FormGroup({
    courseCode: new FormControl('', [Validators.required]),
    courseName: new FormControl('', [Validators.required]),
    courseFee: new FormControl('', [Validators.required]),
    courseDescription: new FormControl('', [Validators.required]),
    courseStartDate: new FormControl('', [Validators.required]),
    courseEndDate: new FormControl('', [Validators.required]),
  });

  @ViewChild('courseCodeInput', { static: true }) courseCodeInput!: ElementRef;

  ngAfterViewInit() {
    this.courseCodeInput.nativeElement.focus();
  }

  ngOnInit() {
    this.loadAllCourses();
    this.cd.detectChanges();

  }


  test(){
    this.loadAllCourses();
  }


  saveForm() {
    if (this.courseForm.valid) {
      const {
        courseCode,
        courseName,
        courseFee,
        courseDescription,
        courseStartDate,
        courseEndDate
      } = this.courseForm.value;
      this.adminService.create(courseCode, courseName, courseFee, courseDescription, courseStartDate, courseEndDate).subscribe(response => {
        this.snackBarService.snackBar("Course Added Successfully", "close", 5000, 'ltr', 'center', 'bottom');
        this.loadAllCourses();
      });
    } else {
      Object.values(this.courseForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.adminService.findAll().subscribe(response => {
      this.courseList = response.data;
      this.cd.detectChanges();
    });
  }

  loadCourses() {
    if (this.searchId.trim() === '') {
      this.loadAllCourses();
    } else {
      this.adminService.find(this.searchId).subscribe(response => {
        if (response && response.data) {
          this.courseList = [response.data];
        } else {
          this.courseList = [];
        }

      }, error => {
        this.courseList = [];
      });
    }
  }

  viewCourse(course: any) {
    this.dialog.open(ViewCourseComponent, {
      width: 'auto',
      data: course
    });
  }

  editCourse(course: any) {
    const dialogRef =  this.dialog.open(EditCourseComponent, {
      width: '400px',
      data: course
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        dialogRef.close(true);
        this.loadAllCourses();
      }
    });
  }

  deleteCourse(courseCode: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: "Are you sure you want to delete ?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.adminService.delete(courseCode).subscribe(response => {
          this.snackBarService.snackBar("Course Deleted Successfully", "close", 5000, 'ltr', 'center', 'bottom');
          this.cd.detectChanges();
          this.loadAllCourses();
          if (response.status) {
            this.loadAllCourses();
          }
        });
      }
    });
  }


}
