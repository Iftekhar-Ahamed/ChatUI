import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {UserInfoModel} from "../../models/user.model";
import {UserInfoState} from "../../../store/user-info/user-info.state";
import {UserInfoAction} from "../../../store/user-info/user-info.action";
import {DropDownListComponent} from "../drop-down-list/drop-down-list.component";
import {TextInputComponent} from "../text-input/text-input.component";
import {PasswordInputComponent} from "../password-input/password-input.component";
import {DdlModel, TextInputModel} from "../../models/common/ui-models";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropDownListComponent, TextInputComponent, PasswordInputComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user$: Observable<UserInfoModel|null>;
  isEditable: boolean = false;
  passwordFieldType = 'password';


  titleDdl: DdlModel = {
    data: [
      {
        key: "",
        value: "Select title"
      },
      {
        key: "1",
        value: "Mr"
      },
      {
        key: "2",
        value: "Ms"
      },
    ],
    hasErrors: false,
    selectedData: {
      key: "",
      value: "Select title"
    }
  };
  firstNameInput: TextInputModel = {
    value: '',
    errorMessage: '',
    placeholder: 'Enter your first name',
    hasErrors: false
  };
  middleNameInput: TextInputModel = {
    value: '',
    errorMessage: '',
    placeholder: 'Enter your middle name',
    hasErrors: false
  };
  lastNameInput: TextInputModel = {
    value: '',
    errorMessage: '',
    placeholder: 'Enter your last name',
    hasErrors: false
  };
  dobInput: TextInputModel = {
    value: '',
    errorMessage: '',
    placeholder: 'DOB',
    hasErrors: false
  };
  emailInput: TextInputModel = {
    value: '',
    errorMessage: '',
    placeholder: 'Enter a valid email',
    hasErrors: false
  };
  passwordInput: TextInputModel = {
    value: '',
    errorMessage: '',
    placeholder: 'Enter a strong password',
    hasErrors: false
  };

  constructor(
    private store : Store,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.user$ = this.store.select(UserInfoState.getUserInfo);
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.profileForm = this.fb.group({
        name: [{ value: `${user?.name.firstName} ${user?.name.middleName} ${user?.name.lastName}`, disabled: true }],
        username: [{ value: user?.email, disabled: true }],
        //password: [{ value: `NONE`, disabled: true }]
      });
    });
  }

  toggleEdit(): void {
    this.isEditable = !this.isEditable;
    const method = this.isEditable ? 'enable' : 'disable';
    this.profileForm.controls['name'][method]();
    this.profileForm.controls['username'][method]();
    this.profileForm.controls['password'][method]();
  }
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onUpdate(): void {
    if (this.profileForm.valid) {
      // Dispatch an action to update the user details
      // this.store.dispatch(new UpdateUser(this.profileForm.value));
      this.toggleEdit();
    }
  }

  onLogout(): void {

    this.store.dispatch(UserInfoAction.userLogOutAsync);
    this.router.navigate(['../',]);
  }
}
