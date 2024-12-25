import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {UserInfoModel} from "../../models/user.model";
import {UserInfoState} from "../../../store/user-info/user-info.state";
import {UserInfoAction} from "../../../store/user-info/user-info.action";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user$: Observable<UserInfoModel|null>;
  isEditable: boolean = false;
  passwordFieldType = 'password';

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
