import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {DdlModel} from "../../models/common/ui-models";

@Component({
  selector: 'app-drop-down-list',
  imports: [
    NgClass
  ],
  templateUrl: './drop-down-list.component.html',
  styleUrl: './drop-down-list.component.css'
})
export class DropDownListComponent {
  @Input() data : DdlModel;
}
