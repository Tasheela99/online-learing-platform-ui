import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-header',
  standalone: true,
    imports: [
        MatButton,
        MatToolbar,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  constructor(private auth:AuthService) {
  }

  logOut() {
    this.auth.logout();
  }
}
