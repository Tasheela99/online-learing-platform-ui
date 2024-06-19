import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {Router, RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";
import {UserHeaderComponent} from "../../../../components/user-header/user-header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    RouterOutlet,
    UserHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ngOnInit() {
  }
}
