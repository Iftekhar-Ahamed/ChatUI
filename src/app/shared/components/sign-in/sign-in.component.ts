import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from "@ngxs/store";
import {PasswordInputComponent} from "../password-input/password-input.component";
import {TextInputComponent} from "../text-input/text-input.component";
import {TextInputModel} from "../../models/common/ui-models";
import {StringUtils} from "../../../utils/string.utils";
import {lastValueFrom} from "rxjs";
import {LogInRequestDto} from "../../models/user-log-in/user-log-in-request.model";
import {UserInfoAction} from "../../../store/user-info/user-info.action";
import {UserInfoState} from "../../../store/user-info/user-info.state";

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, PasswordInputComponent, TextInputComponent],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css'
})

export class SignInComponent {
    usernameInput: TextInputModel = {
        value: '',
        errorMessage: '',
        placeholder: 'Enter your registered email',
        hasErrors: false
    };
    passwordInput: TextInputModel = {
        value: '',
        errorMessage: '',
        placeholder: 'Enter your password',
        hasErrors: false
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store,
    ) {
    }

    validateInput(): boolean {

        let isValid: boolean = true;
        if (!StringUtils.isValidEmail(this.usernameInput.value)) {
            this.usernameInput.hasErrors = true;
            isValid = false;
        } else {
            this.usernameInput.hasErrors = false;
        }

        if (StringUtils.isEmptyOrWhitespace(this.passwordInput.value)) {
            this.passwordInput.hasErrors = true;
            isValid = false;
        } else {
            this.passwordInput.hasErrors = false;
        }

        return isValid;
    }

    async logIn() {

        if(this.validateInput())
        {
            const userLogInReq: LogInRequestDto = {
                userName: this.usernameInput.value,
                password: this.passwordInput.value,
            };

            try {
                const result = await lastValueFrom(this.store.dispatch(new UserInfoAction.userLogInAsync(userLogInReq)));

                this.store.select(UserInfoState.isUserLogIn).subscribe(isLoggedIn => {
                    if (isLoggedIn) {
                        const returnUrl = '/home';
                        this.router.navigate([returnUrl]);
                    }
                });

            } catch (error) {
                console.error('An error occurred during login', error);
            }
        }
    }

    signUp() {
        this.router.navigate(['../sign-up'], {relativeTo: this.route}).then((r) => {
            if (r) {
                console.log('Navigation to /welcome/sign-up successful!');
            } else {
                console.log('Navigation to /welcome/sign-up failed!');
            }
        });
    }
}
