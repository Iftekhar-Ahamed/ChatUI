import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DdlModel, TextInputModel} from "../../models/common/ui-models";
import {TextInputComponent} from "../text-input/text-input.component";
import {DropDownListComponent} from "../drop-down-list/drop-down-list.component";
import {DateTimePickerComponent} from "../date-time-picker/date-time-picker.component";
import {PasswordInputComponent} from "../password-input/password-input.component";
import {StringUtils} from "../../../utils/string.utils";
import {DateTimeUtils} from "../../../utils/date-time.utils";
import {UserSignUpRequest} from "../../models/user-sign-up/user-sign-up.model";
import {Store} from "@ngxs/store";
import {UserActions} from "../../../store/user-actions/user-actions.action";
import {lastValueFrom} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TextInputComponent, DropDownListComponent, DateTimePickerComponent, PasswordInputComponent],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

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
        isEditable: true,
        hasErrors: false,
        selectedData: {
            key: "",
            value: "Select title"
        }
    };
    firstNameInput: TextInputModel = {
        value: '',
        errorMessage: '',
        isEditable: true,
        placeholder: 'Enter your first name',
        hasErrors: false
    };
    middleNameInput: TextInputModel = {
        value: '',
        errorMessage: '',
        placeholder: 'Enter your middle name',
        isEditable: true,
        hasErrors: false
    };
    lastNameInput: TextInputModel = {
        value: '',
        errorMessage: '',
        placeholder: 'Enter your last name',
        isEditable: true,
        hasErrors: false
    };
    dobInput: TextInputModel = {
        value: '',
        errorMessage: '',
        placeholder: 'DOB',
        isEditable: true,
        hasErrors: false
    };
    emailInput: TextInputModel = {
        value: '',
        errorMessage: '',
        placeholder: 'Enter a valid email',
        isEditable: true,
        hasErrors: false
    };
    passwordInput: TextInputModel = {
        value: '',
        errorMessage: '',
        placeholder: 'Enter a strong password',
        isEditable: true,
        hasErrors: false
    };


    constructor(private store : Store,private router : Router,private route: ActivatedRoute) {
    }

    validateInput(): boolean {
        let isValid: boolean = true;

        if (StringUtils.isEmptyOrWhitespace(this.firstNameInput.value)) {
            this.firstNameInput.hasErrors = true;
            isValid = false;
        } else {
            this.firstNameInput.hasErrors = false;
        }

        if (StringUtils.isEmptyOrWhitespace(this.lastNameInput.value)) {
            this.lastNameInput.hasErrors = true;
            isValid = false;
        } else {
            this.lastNameInput.hasErrors = false;
        }

        if (!StringUtils.isValidEmail(this.emailInput.value)) {
            this.emailInput.hasErrors = true;
            isValid = false;
        } else {
            this.emailInput.hasErrors = false;
        }

        if (!DateTimeUtils.isBefore18Years(this.dobInput.value)) {
            this.dobInput.hasErrors = true;
            isValid = false;
        } else {
            this.dobInput.hasErrors = false;
        }

        if (StringUtils.isEmptyOrWhitespace(this.passwordInput.value)) {
            this.passwordInput.hasErrors = true;
            isValid = false;
        } else {
            this.passwordInput.hasErrors = false;
        }

        if (this.titleDdl.selectedData.key == "") {
            this.titleDdl.hasErrors = true;
            isValid = false;
        } else {
            this.titleDdl.hasErrors = false;
        }

        return isValid;
    }

    async apply() {

        if (this.validateInput())
        {
            let request : UserSignUpRequest = {
                name : {
                    title : this.titleDdl.selectedData.value,
                    firstName : this.firstNameInput.value,
                    middleName : this.middleNameInput.value,
                    lastName : this.lastNameInput.value
                },
                dob : this.dobInput.value,
                email : this.emailInput.value,
                password: this.passwordInput.value,
                contactNumberCountryCode : null,
                contactNumber : null,
                userId : null
            }

            await lastValueFrom(this.store.dispatch(new UserActions.createNewAccountAsync(request)));
        }
    }

    signIn() {
        this.router.navigate(['../sign-in'], { relativeTo: this.route }).then((r) => {
            if (r) {
                console.log('Navigation to /welcome/sign-in successful!');
            } else {
                console.log('Navigation to /welcome/sign-in failed!');
            }
        });
    }


}
