import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TextInputModel} from "../../models/common/ui-models";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-password-input',
  imports: [
    NgClass
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css'
})
export class PasswordInputComponent
{
  @Input() data: TextInputModel;
  @Output() dataChange = new EventEmitter<TextInputModel>();
  isVisible : boolean = false;

  onValueChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.data.value = inputElement.value;
    this.data.hasErrors = false;
  }

  get placeHolder() : string
  {
    if(this.data.hasErrors)
    {
      return this.data.placeholder;
    }

    return this.data.placeholder;
  }

  togglePasswordVisibility()
  {
    this.isVisible = !this.isVisible;
  }
}
