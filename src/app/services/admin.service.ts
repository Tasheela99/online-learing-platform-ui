import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {

  }

  private baseUrl = 'http://localhost:3001/api/v1/courses';


  findAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-all`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/` + id);
  }

  find(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/find/` + id);
  }

  create(courseCode: any, courseName: any, courseFee: number | any, courseDescription: any, courseStartDate: any, courseEndDate: any,): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/save`, {
      courseCode,
      courseName,
      courseFee,
      courseDescription,
      courseStartDate,
      courseEndDate
    });
  }


  update(courseCode: any, courseName: any, courseFee: number, courseDescription: any, courseStartDate: any, courseEndDate: any,): Observable<any> {
    return this.http.put<any>('http://localhost:3001/api/v1/courses/update/' + courseCode, {
      courseCode,
      courseName,
      courseFee,
      courseDescription,
      courseStartDate,
      courseEndDate
    });
  }

}
