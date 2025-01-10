import { Component, Input, OnInit } from '@angular/core';
import {TextInputModel} from "../../models/common/ui-models";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  @Input() data!: TextInputModel;

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
}
