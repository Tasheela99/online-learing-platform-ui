import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatLabel} from "@angular/material/form-field";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {LoadingComponent} from "./components/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatLabel, HttpClientModule, MatDialogModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'learning-platform-ui';
}
