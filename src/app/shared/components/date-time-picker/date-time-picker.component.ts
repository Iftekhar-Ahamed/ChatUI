import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DateInputModel} from "../../models/common/ui-models";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-date-time-picker',
    imports: [
        NgClass
    ],
    templateUrl: './date-time-picker.component.html',
    styleUrl: './date-time-picker.component.css'
})
export class DateTimePickerComponent {
    @Input() data: DateInputModel;
    @Output() dataChange = new EventEmitter<DateInputModel>();

    onValueChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.data.value = inputElement.value;
        this.data.hasErrors = false;
    }
}
