import {Component, inject, Inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {UserService} from "../../../../../../services/user.service";
import {SnackbarService} from "../../../../../../services/snackbar.service";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  editForm: FormGroup;
  readonly dialog = inject(MatDialog);

  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private snackBarService: SnackbarService
  ) {
    this.editForm = new FormGroup({
      userName: new FormControl(data.userName, [Validators.required]),
      mobile: new FormControl(data.mobile, [Validators.required]),
    });
  }

  submit(): void {
    const userName = this.editForm.get('userName')?.value;
    const mobile = this.editForm.get('mobile')?.value;
    if (this.editForm.valid) {
      this.userService.update(this.data.id, userName, mobile).subscribe(response => {
        if (response && response === true) {
          this.dialogRef.close(true);
        } else {
          this.snackBarService.snackBar("Error Updating", "close", 5000, 'ltr', 'center', 'bottom');
        }
      }, error => {
        this.snackBarService.snackBar("Error", "close", 5000, 'ltr', 'center', 'bottom');
      });
    }
  }
}
