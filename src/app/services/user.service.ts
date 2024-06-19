import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3001/api/v1/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-all`);
  }

  find(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/find/${id}`);
  }

  update(id: any, userName: any, mobile: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, { userName, mobile });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }
}
