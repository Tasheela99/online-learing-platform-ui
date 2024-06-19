import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AdminService} from "../../../../services/admin.service";
import {ViewCourseComponent} from "../home/inner-items/view-course/view-course.component";
import {EditCourseComponent} from "../home/inner-items/edit-course/edit-course.component";

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
        ReactiveFormsModule
    ],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.scss'
})
export class CourseManagementComponent implements OnInit{

  courseList: Array<any> = [];
  searchId = '';
  readonly dialog = inject(MatDialog);

  constructor(private adminService: AdminService) {
  }

  courseForm = new FormGroup({
    courseCode: new FormControl('', [Validators.required]),
    courseName: new FormControl('', [Validators.required]),
    courseFee: new FormControl('', [Validators.required]),
    courseDescription: new FormControl('', [Validators.required]),
    courseStartDate: new FormControl('', [Validators.required]),
    courseEndDate: new FormControl('', [Validators.required]),
  });

  saveForm() {
    const courseCode = this.courseForm.get('courseCode')?.value;
    const courseName = this.courseForm.get('courseName')?.value;
    const courseFee = this.courseForm.get('courseFee')?.value;
    const courseDescription = this.courseForm.get('courseDescription')?.value;
    const courseStartDate = this.courseForm.get('courseStartDate')?.value;
    const courseEndDate = this.courseForm.get('courseEndDate')?.value;
    this.adminService.create(courseCode, courseName, courseFee, courseDescription, courseStartDate, courseEndDate).subscribe(response => {
      this.loadAllCourses();
    });
  }

  ngOnInit() {
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.adminService.findAll().subscribe(response => {
      this.courseList = response.data;
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
        console.error('Error loading course:', error);
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
    this.dialog.open(EditCourseComponent, {
      width: '400px',
      data: course
    });
  }

  deleteCourse(courseCode: any) {
    if (confirm('Are you sure you want to delete course: ' + courseCode + '?')) {
      this.adminService.delete(courseCode).subscribe(response => {
        if (response && response.status === true) {
          this.loadAllCourses();
        }
      });
    }
  }

}
