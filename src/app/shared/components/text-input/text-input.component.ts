import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TextInputModel} from "../../models/common/ui-models";
import {NgClass} from "@angular/common";
import {StringUtils} from "../../../utils/string.utils";

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    imports: [
        NgClass
    ],
    styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
    @Input() data: TextInputModel;
    @Output() dataChange = new EventEmitter<TextInputModel>();

    ngOnInit(): void {
        if (!this.data) {
            this.data = {
                placeholder: 'Default placeholder',
                value: '',
                hasErrors: true,
                isEditable: false,
                errorMessage: 'Default error',
            };
        }
    }

    onValueChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.data.value = inputElement.value;
        this.data.hasErrors = false;
    }


    get placeHolder(): string {
        if (this.data.hasErrors) {
            if (StringUtils.isEmptyOrWhitespace(this.data.value)) {
                if (!StringUtils.isEmptyOrWhitespace(this.data.errorMessage)) {
                    return this.data.errorMessage;
                }
                return this.data.placeholder;
            }
        }

        return this.data.placeholder;
    }
}
