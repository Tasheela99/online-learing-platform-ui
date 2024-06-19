import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        MatToolbar,
        MatIcon,
        MatIconButton,
        MatButton,
        RouterLink
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
