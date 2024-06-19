import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-view-course-enrolment',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatDialogContent,
    DatePipe
  ],
  templateUrl: './view-course-enrolment.component.html',
  styleUrl: './view-course-enrolment.component.scss'
})
export class ViewCourseEnrolmentComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {

  }
}
