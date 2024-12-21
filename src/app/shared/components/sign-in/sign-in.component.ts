import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {Store} from "@ngxs/store";
import {LogInRequestDto} from "../../models/user-log-in/user-log-in-request.model";
import {UserInfoAction} from "../../../store/user-info/user-info.action";
import {UserInfoState} from "../../../store/user-info/user-info.state";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent implements OnInit
{
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store : Store,
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const userLogInReq: LogInRequestDto = {
      userName: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    try {
      const result = await this.store.dispatch(new UserInfoAction.userLogInAsync(userLogInReq)).toPromise();

      this.store.select(UserInfoState.isUserLogIn).subscribe(isLoggedIn => {
        if (isLoggedIn) {
          const returnUrl = this.returnUrl || '/home';
          this.router.navigate([returnUrl]);
        }
      });

    } catch (error) {
      console.error('An error occurred during login', error);
    }
  }

}
