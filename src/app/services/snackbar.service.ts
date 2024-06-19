import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBarService: MatSnackBar) {
  }

  public snackBar = (message: string, action: string, duration: number, direction: any | undefined, horizontalPosition: any | undefined, verticalPosition: any | undefined) => {
    this.snackBarService.open(message, action, {
      duration,
      direction,
      horizontalPosition,
      verticalPosition
    });
  }
}
