import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextInputModel} from "../../models/common/ui-models";
import {TextInputComponent} from "../text-input/text-input.component";
import {DropDownListComponent} from "../drop-down-list/drop-down-list.component";
import {DateTimePickerComponent} from "../date-time-picker/date-time-picker.component";
import {PasswordInputComponent} from "../password-input/password-input.component";
import {StringUtils} from "../../../utils/string.utils";
import {DateTimeUtils} from "../../../utils/date-time.utils";

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TextInputComponent, DropDownListComponent, DateTimePickerComponent, PasswordInputComponent],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

    submitted = false;

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


    constructor() {
    }

    validateInput():boolean
    {
        let isValid: boolean = true;

        if(StringUtils.isEmptyOrWhitespace(this.firstNameInput.value))
        {
            this.firstNameInput.hasErrors = true;
            isValid = false;
        }
        else
        {
            this.firstNameInput.hasErrors = false;
        }

        if(StringUtils.isEmptyOrWhitespace(this.lastNameInput.value))
        {
            this.lastNameInput.hasErrors = true;
            isValid = false;
        }
        else
        {
            this.lastNameInput.hasErrors = false;
        }

        if(!StringUtils.isValidEmail(this.emailInput.value))
        {
            this.emailInput.hasErrors = true;
            isValid = false;
        }
        else
        {
            this.emailInput.hasErrors = false;
        }

        if(!DateTimeUtils.isBefore18Years(this.dobInput.value))
        {
            this.dobInput.hasErrors = true;
            isValid = false;
        }
        else
        {
            this.dobInput.hasErrors = false;
        }

        if(StringUtils.isEmptyOrWhitespace(this.passwordInput.value))
        {
            this.passwordInput.hasErrors = true;
            isValid = false;
        }
        else
        {
            this.passwordInput.hasErrors = false;
        }


        return isValid;
    }

    apply(){

        console.log(this.dobInput);

        if(this.validateInput())
        {

        }
    }

}
