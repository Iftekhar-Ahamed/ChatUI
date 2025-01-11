import {Component, Input} from '@angular/core';
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
  @Input() data!: TextInputModel;
  isVisible : boolean = false;

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        placeholder: 'Default placeholder',
        value: '',
        hasErrors: true,
        errorMessage : 'Default error',
      };
    }
  }

  get placeHolder() : string
  {
    if(this.data.hasErrors)
    {
      return this.data.errorMessage;
    }

    return this.data.placeholder;
  }

  togglePasswordVisibility()
  {
    this.isVisible = !this.isVisible;
  }
}
