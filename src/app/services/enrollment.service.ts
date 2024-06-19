import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookiesService} from "./cookies.service";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private baseUrl = 'http://localhost:3001/api/v1/enrolments';

  constructor(private http: HttpClient, private cookiesService: CookiesService) {
  }

  enrollUserInCourse(courseId: string): Observable<any> {
    const token = this.cookiesService.getToken('token');
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post(`${this.baseUrl}/enrol-course/${courseId}`, {}, {headers});
  }


  getAllEnrollments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-all-enrol-courses`)
  }

  changeEnrollmentState(_id: string, enrolledState: boolean): Observable<any> {
    const url = `${this.baseUrl}/change-state/${_id}`;
    return this.http.put(url, {enrolledState});
  }

  getAllEnrolledUserCourses(): Observable<any> {
    const token = this.cookiesService.getToken('token');
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get(`${this.baseUrl}/get-enrol-courses`, {headers});
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/` + id);
  }


}
