import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {
  MatDialog, MatDialogModule,
} from '@angular/material/dialog';
import {EditCourseComponent} from "./inner-items/edit-course/edit-course.component";
import {MatIcon} from "@angular/material/icon";
import {ViewCourseComponent} from "./inner-items/view-course/view-course.component";
import {MatCard, MatCardModule} from "@angular/material/card";
import {AdminService} from "../../../../services/admin.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterOutlet} from "@angular/router";
import {AdminHeaderComponent} from "../../../../components/admin-header/admin-header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatLabel,
    MatButton,
    ReactiveFormsModule,
    NgForOf,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatCardModule,
    MatCard,
    HttpClientModule,
    RouterOutlet,
    AdminHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

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
    this.loadCourses();
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
