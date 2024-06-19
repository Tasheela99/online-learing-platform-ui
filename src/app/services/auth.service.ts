import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CookiesService} from "./cookies.service";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3001/api/v1/users';

  constructor(private http: HttpClient, private cookiesService: CookiesService, private router: Router, private dialog: MatDialog, private snackBarService: SnackbarService
  ) {
  }

  public createUser(userName: any, email: any, password: any, mobile: number | any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, {
      userName,
      email,
      password,
      mobile
    })
  }

  public login(email: any, password: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, {
      email,
      password,
    }, {observe: 'response' as 'body'}).pipe(
      map(data => {
        return data;
      })
    )
  }

  public logout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Logout',
        message: `Are you sure you want to log out?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) { // User confirmed logout
        this.cookiesService.deleteToken('token');
        this.router.navigateByUrl('/security/login');
        this.snackBarService.snackBar("Come Back Again...", "close", 5000, 'ltr', 'center', 'bottom');
      }
    });
  }
}
