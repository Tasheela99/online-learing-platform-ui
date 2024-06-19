import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../../../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    MatError
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private auth:AuthService,private router:Router) {
  }

  form=new FormGroup({
    userName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    mobile:new FormControl('',[Validators.required]),
  })

  signUp() {
    const userName = this.form.get('userName')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    const mobile = this.form.get('mobile')?.value;
    console.log(userName, email, password, mobile);

    this.auth.createUser(userName,email,password,mobile).subscribe(r=>{
      this.router.navigateByUrl("/security/login");
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
