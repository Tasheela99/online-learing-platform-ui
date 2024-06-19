import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent} from "@angular/material/dialog";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-view-course',
  standalone: true,
  imports: [
    MatDialogContent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardModule
  ],
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.scss'
})
export class ViewCourseComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
