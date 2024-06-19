import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CookiesService} from "./cookies.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3001/api/v1/users';

  constructor(private http: HttpClient,private cookiesService:CookiesService,private router:Router) {
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

  public logout(){
    this.cookiesService.deleteToken('token');
    this.router.navigateByUrl('/security/login');
  }
}
