import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {lastValueFrom, Observable, takeWhile} from 'rxjs';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserInfoModel} from "../../models/user.model";
import {UserInfoState} from "../../../store/user-info/user-info.state";
import {UserInfoAction} from "../../../store/user-info/user-info.action";
import {DropDownListComponent} from "../drop-down-list/drop-down-list.component";
import {TextInputComponent} from "../text-input/text-input.component";
import {PasswordInputComponent} from "../password-input/password-input.component";
import {DdlModel, TextInputModel} from "../../models/common/ui-models";
import {NameElementDto, UserInformationDto} from "../../models/user-info/user-info-response.model";

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DropDownListComponent, TextInputComponent, PasswordInputComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
    profileForm: FormGroup;
    user$: Observable<UserInfoModel | null> = this.store.select(UserInfoState.getUserInfo);
    userInfo: UserInfoModel;
    isActive: boolean = false;
    isEditable: boolean = false;

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
        isEditable: this.isEditable,
        selectedData: {
            key: "",
            value: "Select title"
        }
    };
    firstNameInput: TextInputModel = {
        value: '',
        errorMessage: '',
        isEditable: this.isEditable,
        placeholder: 'Enter your first name',
        hasErrors: false
    };
    middleNameInput: TextInputModel = {
        value: '',
        errorMessage: '',
        isEditable: this.isEditable,
        placeholder: 'Enter your middle name',
        hasErrors: false
    };
    lastNameInput: TextInputModel = {
        value: '',
        errorMessage: '',
        isEditable: this.isEditable,
        placeholder: 'Enter your last name',
        hasErrors: false
    };
    dobInput: TextInputModel = {
        value: '',
        errorMessage: '',
        isEditable: this.isEditable,
        placeholder: 'DOB',
        hasErrors: false
    };
    emailInput: TextInputModel = {
        value: '',
        errorMessage: '',
        isEditable: this.isEditable,
        placeholder: 'Enter a valid email',
        hasErrors: false
    };
    passwordInput: TextInputModel = {
        value: '',
        errorMessage: '',
        isEditable: this.isEditable,
        placeholder: 'Update your password',
        hasErrors: false
    };

    constructor(
        private store: Store,
        private router: Router
    ) {
    }

    ngOnDestroy(): void {
        this.isActive = false;
    }

    ngOnInit(): void {
        this.isActive = true;
        this.user$.pipe(
            takeWhile(() => this.isActive)
        ).subscribe((result) => {
            if (result != null) {
                this.userInfo = result;
                this.setUserInfo(this.userInfo);
            }
        });
    }

    setUserInfo(result: UserInfoModel) {
        let matchedTitleValue = this.titleDdl.data.find(x => x.value == result.name.title);
        if (matchedTitleValue != null) {
            this.titleDdl.selectedData = matchedTitleValue;
        }
        this.firstNameInput.value = result.name.firstName;
        this.middleNameInput.value = result.name.middleName ?? "";
        this.lastNameInput.value = result.name.lastName;
        this.emailInput.value = result.email;
        this.dobInput.value = "";
        this.passwordInput.value = "";
    }

    async onUpdate() {
        let payload: UserInformationDto = {
            userId : this.userInfo.id,
            name : {
                title : this.titleDdl.selectedData.value,
                firstName : this.firstNameInput.value,
                middleName : this.middleNameInput.value,
                lastName : this.lastNameInput.value,
            },
            email : this.emailInput.value,
            contactNumber : null,
            contactNumberCountryCode : null,
            dob : null
        }
        console.log("payload", payload);
        await lastValueFrom(this.store.dispatch(new UserInfoAction.UpdateUserInfoAsync(payload)));
    }

    onCancel() {
        this.toggleEdit();
        this.setUserInfo(this.userInfo);
    }

    toggleEdit(): void {
        this.isEditable = !this.isEditable;

        this.titleDdl.isEditable = this.isEditable;
        this.firstNameInput.isEditable = this.isEditable;
        this.middleNameInput.isEditable = this.isEditable;
        this.lastNameInput.isEditable = this.isEditable;
        this.dobInput.isEditable = this.isEditable;
        this.emailInput.isEditable = this.isEditable;
        this.passwordInput.isEditable = this.isEditable;
    }

    onLogout(): void {
        this.store.dispatch(UserInfoAction.UserLogOutAsync);
        this.router.navigate(['../',]);
    }
}
