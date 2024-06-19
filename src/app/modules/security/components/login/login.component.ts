import {Component, inject} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatFabButton} from "@angular/material/button";
import {FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {first} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {CookiesService} from "../../../../services/cookies.service";
import {NgIf} from "@angular/common";
import {JwtDecoderService} from "../../../../services/jwt-decoder.service";
import {routes} from "../../../../app.routes";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatFabButton,
    MatButton,
    ReactiveFormsModule,
    RouterLink,
    MatError,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private jwtDecorder = inject(JwtDecoderService);
  constructor(private auth: AuthService, private router: Router, private cookieService: CookiesService) {
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  submit() {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    this.auth.login(email, password).pipe(first()).subscribe((data: HttpResponse<any>) => {

      const token = data.headers.get('Authorization')!;
      this.cookieService.setCookies(token);
      let decodeToken = this.jwtDecorder.decodeToken(token);
      let role = decodeToken.role;
      if (role =='ADMIN'){
        this.router.navigateByUrl('/admin/dashboard');
      }else {
        this.router.navigateByUrl('/user/dashboard');
      }
    }, error => {
      console.log(error)
    })
  }

  get f() {
    return this.form.controls;
  }


  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    if (control?.hasError('pattern')) {
      return 'Not a valid mobile number';
    }
    return '';
  }


}
