import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchUserCardComponent } from '../search-user-card/search-user-card.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {ListViewModel} from "../../models/common/list-view.model";

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule,SearchUserCardComponent,ScrollingModule],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css'
})
export class ListViewComponent
{
  @Input() ListOfResult : ListViewModel;
}
