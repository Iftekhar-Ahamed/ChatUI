import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ItemLinkAction } from '../../../store/itemLink/itemLink.action';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    const data = this.route.snapshot.data;
    console.log(data['path']);
    store.dispatch(new ItemLinkAction.SelectItemLink(data['path']))
  }
}
