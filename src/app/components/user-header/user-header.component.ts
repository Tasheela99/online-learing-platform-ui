import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [
    MatButton,
    MatToolbar,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss'
})
export class UserHeaderComponent {

  constructor(private auth:AuthService) {
  }

  logOut() {
    this.auth.logout();
  }
}
