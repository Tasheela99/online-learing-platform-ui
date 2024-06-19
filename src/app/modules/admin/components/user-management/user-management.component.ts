import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {UserService} from "../../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../home/inner-items/edit-user/edit-user.component";
import {ConfirmationDialogComponent} from "../../../../components/confirmation-dialog/confirmation-dialog.component";
import {SnackbarService} from "../../../../services/snackbar.service";
import {ChangeDetectorRef} from '@angular/core';


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSlideToggle,
    NgForOf
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  searchId: any = '';
  usersList: Array<any> = [];
  readonly dialog = inject(MatDialog);

  constructor(private userService: UserService, private snackBarService: SnackbarService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadUsers();
    this.cd.detectChanges();
  }

  loadUsers() {
    this.userService.getAll().subscribe(response => {
      if (response && response.data) {
        this.usersList = response.data;
        this.cd.detectChanges();
      } else {
        this.usersList = [];
        this.cd.detectChanges();
      }
    }, error => {
      this.cd.detectChanges();
      this.usersList = [];
    });
  }

  loadUser() {
    if (this.searchId.trim() === '') {
      this.loadUsers();
    } else {
      this.userService.find(this.searchId).subscribe(response => {
        if (response && response.data) {
          this.usersList = [response.data];
        } else {
          this.usersList = [];
        }
      }, error => {
        console.error('Error loading user:', error);
        this.usersList = [];
      });
    }
  }

  updateUser(user: any) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '400px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadUsers();
      }
    });
  }

  deleteUser(_id: any) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete ?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.userService.delete(_id).subscribe(response => {
          this.snackBarService.snackBar("User Deleted Successfully", "close", 5000, 'ltr', 'center', 'bottom');
          if (response.status) {
            this.loadUsers();
            this.cd.detectChanges();
          }
        });
      }
    });
  }

}
