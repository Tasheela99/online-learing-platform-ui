import {Component, inject, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent, MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AdminService} from "../../../../../../services/admin.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatIcon,
    MatLabel,
    HttpClientModule
  ],
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService:AdminService
  ) {
    this.editForm = new FormGroup({
      courseCode: new FormControl(data.courseCode, [Validators.required]),
      courseName: new FormControl(data.courseName, [Validators.required]),
      courseFee: new FormControl(data.courseFee, [Validators.required]),
      courseDescription: new FormControl(data.courseDescription, [Validators.required]),
      courseStartDate: new FormControl(data.courseStartDate, [Validators.required]),
      courseEndDate: new FormControl(data.courseEndDate, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    const courseCode=this.editForm.get('courseCode')?.value;
    const courseName=this.editForm.get('courseName')?.value;
    const courseFee=this.editForm.get('courseFee')?.value;
    const courseDescription=this.editForm.get('courseDescription')?.value;
    const courseStartDate=this.editForm.get('courseStartDate')?.value;
    const courseEndDate=this.editForm.get('courseEndDate')?.value;
    if (this.editForm.valid) {
      this.adminService.update(courseCode,courseName,courseFee,courseDescription,courseStartDate,courseEndDate)
        .subscribe(response => {
          if (response && response === true) {
            this.dialogRef.close(true);
          } else {
          }
        });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
