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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(response => {
      if (response && response.data) {
        this.usersList = response.data;
      } else {
        this.usersList = [];
      }
    }, error => {
      console.error('Error loading users:', error);
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
    if (confirm('Are you sure you want to delete this User?')) {
      this.userService.delete(_id).subscribe(response => {
        if (response && response.status === true) {
          this.loadUsers();
        } else {
          console.error('Failed to delete user');
        }
      }, error => {
        console.error('Error deleting user:', error);
      });
    }
  }

}
