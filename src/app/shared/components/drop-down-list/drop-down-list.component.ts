import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {DdlDataModel, DdlModel} from "../../models/common/ui-models";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-drop-down-list',
  imports: [
    NgClass,
    NgForOf,
    FormsModule
  ],
  templateUrl: './drop-down-list.component.html',
  styleUrl: './drop-down-list.component.css'
})
export class DropDownListComponent {
  @Input() data : DdlModel;

  onModelChange(selectedItem: DdlDataModel) {
    console.log(this.data.selectedData,selectedItem);
    //this.data.selectedData = selectedItem;
    this.data.hasErrors = false;
  }
}
