import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {Store} from "@ngxs/store";
import {LogInRequestDto} from "../../models/user-log-in/user-log-in-request.model";
import {UserInfoAction} from "../../../store/user-info/user-info.action";

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
  )
  {
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit()
  {
    this.loginForm = this.formBuilder.group
    (
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    );

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
  }

  get f() { return this.loginForm.controls; }


  async onSubmit()
  {
    const userLogInReq: LogInRequestDto = this.loginForm.value;
    console.log(userLogInReq);

    await this.store.dispatch(new UserInfoAction.userLogInAsync(userLogInReq)).toPromise();

    //this.router.navigate([this.returnUrl]);

  }

}
