import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {DdlModel} from "../../models/common/ui-models";

@Component({
  selector: 'app-drop-down-list',
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './drop-down-list.component.html',
  styleUrl: './drop-down-list.component.css'
})
export class DropDownListComponent implements OnInit {
  @Input() data : DdlModel;
  selectedItem : string;

  selectItem(event: any) {
    const selectedValue = event.target.value;
    this.data.selectedData = this.data.data.find(option => option.key === selectedValue)!;
    this.data.hasErrors = false;
  }

  ngOnInit()
  {
    this.selectedItem = this.data.selectedData?.key ?? "Default";
  }
}
