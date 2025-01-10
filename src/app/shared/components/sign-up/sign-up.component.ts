import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TextInputModel} from "../../models/common/ui-models";
import {TextInputComponent} from "../text-input/text-input.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TextInputComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit
{
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  firstNameInput : TextInputModel = {
    value : '',
    errorMessage : '',
    placeholder : 'Enter your first name',
    hasErrors : false
  };
  middleNameInput : TextInputModel = {
    value : '',
    errorMessage : '',
    placeholder : 'Enter your middle name',
    hasErrors : false
  };
  lastNameInput : TextInputModel = {
    value : '',
    errorMessage : '',
    placeholder : 'Enter your last name',
    hasErrors : false
  };



  constructor(
      private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group
      (
        {
          title: ['', [Validators.required]],
          firstName: ['', Validators.required],
          middleName: [''],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          dob: ['', [Validators.required]],
          password: ['', Validators.required]
        }
      );
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      // this.authenticationService.register(this.registerForm.value)
      //     .subscribe({
      //         next: () => {
      //             this.router.navigate(['/welcome/login']);
      //         },
      //         error: error => {
      //             this.loading = false;
      //         }
      //     });
  }
}
