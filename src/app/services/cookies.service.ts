import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookies: CookieService) { }

  public setCookies(token: string) {
    this.cookies.set('token',token);
  }

  public isExistsToken(key:string):boolean{
    return this.cookies.check(key);
  }

  public getToken(key:string):string{
    if (this.isExistsToken(key)){
      return this.cookies.get(key)
    }
    return '';
  }

  public deleteToken(key:string){
    this.cookies.delete(key);
  }
}
