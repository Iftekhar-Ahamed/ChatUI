import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ItemLinkAction } from '../../../store/itemLink/itemLink.action';
import { LogedInUserState } from '../../../store/logedInUser/logedInUser.state';
import { LogedInUser } from '../../models/user.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm: FormGroup;
  user$: Observable<LogedInUser|null>;
  isEditable: boolean = false;
  passwordFieldType = 'password';
  // @Select(LogedInUserState.user) user$!: Observable<LogedInUser>;

  constructor(
    private store : Store,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.user$ = this.store.select(LogedInUserState.user);
  }
  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.profileForm = this.fb.group({
        name: [{ value: user?.name, disabled: true }],
        username: [{ value: user?.email, disabled: true }],
        password: [{ value: user?.name, disabled: true }]
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
    this.router.navigate(['../',]);
    // Dispatch an action to log out the user
    // this.store.dispatch(new Logout());
  }
}
